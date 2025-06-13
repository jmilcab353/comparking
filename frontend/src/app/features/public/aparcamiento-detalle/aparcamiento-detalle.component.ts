import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AparcamientosService } from '../../../core/services/aparcamientos.service';
import { ReservasService } from '../../../core/services/reservas.service';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-aparcamiento-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './aparcamiento-detalle.component.html',
  styleUrl: './aparcamiento-detalle.component.css'
})
export class AparcamientoDetalleComponent implements OnInit {
  aparcamientos: any[] = [];
  reservas: any[] = [];
  logueado = false;
  userId: number = 0;
  mensaje = '';

  mostrarModalReserva = false;
  reservaRealizada = false;
  aparcamientoSeleccionado: any = null;

  reservaForm: any = {
    fechaInicio: '',
    fechaFin: '',
    tipoPago: ''
  };
  precioCalculado: number = 0;
  usuario: any = null;
  errorReserva = '';
  errorFechaInicio: string = '';

  filtroLocalidad: string = '';
  filtroProvincia: string = '';
  filtroPrecioHora: number | null = null;
  filtroPrecioDia: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  imagenEnAmpliacion: string | null = null;

  minFecha: string = '';

  constructor(
    private aparcamientosService: AparcamientosService,
    private reservasService: ReservasService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.logueado = sessionStorage.getItem('LOGIN') !== null;
    if (this.logueado) {
      const parsed = JSON.parse(sessionStorage.getItem('LOGIN')!);
      this.userId = parsed.user.id;
    }

    const ahora = new Date();
    this.minFecha = ahora.toISOString().slice(0, 16);

    this.aparcamientosService.getAparcamientos().subscribe({
      next: data => this.aparcamientos = data,
      error: () => this.mensaje = 'Error al cargar los aparcamientos.'
    });

    this.reservasService.getReservas().subscribe({
      next: data => this.reservas = data || [],
      error: () => this.reservas = []
    });

    this.usuariosService.getMisDatos().subscribe({
      next: data => this.usuario = data
    });
  }

  estaReservado(aparcamientoId: number): boolean {
    if (!Array.isArray(this.reservas)) return false;
    return this.reservas.some(r =>
      r.aparcamientoId === aparcamientoId &&
      r.pagoConfirmado === true
    );
  }

  get aparcamientosFiltrados(): any[] {
    return this.aparcamientos.filter(a => {
      return !this.estaReservado(a.id) &&
        a.userId !== this.usuario?.id && // Evitamos los propios del usuairo logueado
        (!this.filtroLocalidad || a.localidad.toLowerCase().includes(this.filtroLocalidad.toLowerCase())) &&
        (!this.filtroProvincia || a.provincia.toLowerCase().includes(this.filtroProvincia.toLowerCase())) &&
        (!this.filtroPrecioHora || a.precioHora <= this.filtroPrecioHora) &&
        (!this.filtroPrecioDia || a.precioDia <= this.filtroPrecioDia);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.aparcamientosFiltrados.length / this.itemsPerPage);
  }

  get aparcamientosPaginados(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.aparcamientosFiltrados.slice(start, start + this.itemsPerPage);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  abrirModalReserva(aparcamiento: any): void {
    this.aparcamientoSeleccionado = aparcamiento;
    this.mostrarModalReserva = true;
    this.errorReserva = '';
    this.precioCalculado = 0;
    this.reservaRealizada = false;

    this.usuariosService.getMisDatos().subscribe({
      next: data => this.usuario = data,
      error: () => this.errorReserva = 'Error al cargar tus datos'
    });
  }

  cerrarModalReserva(): void {
    this.mostrarModalReserva = false;
    this.aparcamientoSeleccionado = null;
    this.reservaForm = {
      fechaInicio: '',
      fechaFin: '',
      tipoPago: ''
    };
    this.errorFechaInicio = '';
  }

  calcularPrecio(): void {
    const inicio = new Date(this.reservaForm.fechaInicio);
    const fin = new Date(this.reservaForm.fechaFin);

    if (!this.reservaForm.tipoPago) {
      this.errorReserva = 'Debes elegir si la reserva es por hora o por día.';
      this.precioCalculado = 0;
      return;
    }

    if (fin <= inicio) {
      this.errorReserva = 'La fecha de fin debe ser posterior a la de inicio.';
      this.precioCalculado = 0;
      return;
    }

    if (this.reservaForm.tipoPago === 'horario') {
      const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
      this.precioCalculado = parseFloat((horas * this.aparcamientoSeleccionado.precioHora).toFixed(2));
    } else {
      const dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      this.precioCalculado = parseFloat((dias * this.aparcamientoSeleccionado.precioDia).toFixed(2));
    }

    if (this.usuario.saldo < this.precioCalculado) {
      this.errorReserva = `No tienes saldo suficiente. Necesitas ${this.precioCalculado} €. ` +
        `<br><a href="/usuario/perfil" class="btn btn-outline-danger btn-sm ms-2 mt-2">Recargar saldo</a>`;
    } else {
      this.errorReserva = '';
    }

  }

  confirmarReserva(): void {
    this.calcularPrecio();
    if (this.errorReserva !== '') return;

    const reserva = {
      usuarioId: this.usuario.id,
      aparcamientoId: this.aparcamientoSeleccionado.id,
      fechaInicio: this.reservaForm.fechaInicio,
      fechaFin: this.reservaForm.fechaFin,
      estado: 'pendiente',
      tipoPago: this.reservaForm.tipoPago,
      precioTotal: this.precioCalculado,
      pagoConfirmado: true,
      fechaPago: new Date().toISOString()
    };

    this.reservasService.crearReserva(reserva).subscribe({
      next: () => {
        this.usuario.saldo -= this.precioCalculado;
        this.usuariosService.updateUsuario(this.usuario.id, this.usuario).subscribe({
          next: () => {
            this.reservaRealizada = true;
            setTimeout(() => this.router.navigate(['/aparcamientos/reservados']), 2000);
          },
          error: () => {
            this.mensaje = 'Reserva creada, pero no se pudo actualizar el saldo.';
            setTimeout(() => this.router.navigate(['/aparcamientos/reservados']), 2000);
          }
        });
      },
      error: () => this.errorReserva = 'No se pudo registrar la reserva.'
    });
  }

  mostrarImagenGrande(imagen: string): void {
    this.imagenEnAmpliacion = imagen;
  }

  ocultarImagenGrande(): void {
    this.imagenEnAmpliacion = null;
  }

  validarFechaInicio(): void {
    const inicio = new Date(this.reservaForm.fechaInicio);
    const ahora = new Date();

    if (inicio < ahora) {
      this.errorFechaInicio = 'No puedes seleccionar una fecha anterior a la actual.';
      this.reservaForm.fechaInicio = '';
    } else {
      this.errorFechaInicio = '';
    }

    this.calcularPrecio(); // recalcula si ya estaba la fecha de fin
  }

}
