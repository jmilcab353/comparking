import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../core/services/reservas.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { AparcamientosService } from '../../../core/services/aparcamientos.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit {
  reservasActivas: any[] = [];
  reservasPasadas: any[] = [];
  saldo: number = 0;
  mostrarCodigos: { [id: number]: boolean } = {};

  reservaAEliminar: any = null;
  mostrarModalEliminar = false;

  // Paginación
  paginaActiva = 1;
  paginaPasada = 1;
  itemsPorPagina = 3;

  tituloBreadcrumb = 'Mis reservas';

  constructor(
    private reservasService: ReservasService,
    private usuariosService: UsuariosService,
    private aparcamientosService: AparcamientosService
  ) { }

  ngOnInit(): void {
    this.cargarSaldo();
    this.cargarReservas();
  }

  cargarSaldo(): void {
    this.usuariosService.getPerfilUsuario().subscribe({
      next: (usuario) => this.saldo = usuario.saldo,
      error: (err) => console.error('Error al cargar saldo:', err)
    });
  }

  cargarReservas(): void {
    this.reservasService.getReservas().subscribe({
      next: (reservas) => {
        const ahora = new Date();

        reservas.forEach(reserva => {
          reserva.codigoAcceso = this.generarCodigo();
          reserva.foto = `http://localhost:9000/api/aparcamientos/${reserva.aparcamientoId}/imagen`;
          reserva.mostrarImagen = true;
        });

        this.aparcamientosService.getAparcamientos().subscribe(aparcamientos => {
          reservas.forEach(reserva => {
            const aparcamiento = aparcamientos.find(a => a.id === reserva.aparcamientoId);
            if (aparcamiento) {
              reserva.localidad = aparcamiento.localidad;
              reserva.provincia = aparcamiento.provincia;
            }
          });

          this.reservasActivas = reservas.filter(r =>
            new Date(r.fechaFin) > ahora && r.pagoConfirmado === true
          );
          this.reservasPasadas = reservas.filter(r =>
            new Date(r.fechaFin) <= ahora && r.pagoConfirmado === true
          );
        });
      },
      error: (err) => console.error('Error al cargar reservas:', err)
    });
  }

  generarCodigo(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  toggleCodigo(id: number): void {
    this.mostrarCodigos[id] = !this.mostrarCodigos[id];
  }

  // Paginación
  getReservasActivasPaginadas(): any[] {
    const start = (this.paginaActiva - 1) * this.itemsPorPagina;
    return this.reservasActivas.slice(start, start + this.itemsPorPagina);
  }

  getReservasPasadasPaginadas(): any[] {
    const start = (this.paginaPasada - 1) * this.itemsPorPagina;
    return this.reservasPasadas.slice(start, start + this.itemsPorPagina);
  }

  cambiarPaginaActiva(delta: number): void {
    this.paginaActiva += delta;
  }

  cambiarPaginaPasada(delta: number): void {
    this.paginaPasada += delta;
  }

  confirmarEliminar(reserva: any): void {
    this.reservaAEliminar = reserva;
    this.mostrarModalEliminar = true;
  }

  cancelarEliminar(): void {
    this.reservaAEliminar = null;
    this.mostrarModalEliminar = false;
  }

  eliminarReserva(): void {
    if (!this.reservaAEliminar) return;

    this.reservasService.deleteReserva(this.reservaAEliminar.id).subscribe({
      next: () => {
        this.reservasPasadas = this.reservasPasadas.filter(r => r.id !== this.reservaAEliminar.id);
        this.cancelarEliminar();
      },
      error: (err) => {
        console.error('Error al eliminar reserva:', err);
        this.cancelarEliminar();
      }
    });
  }

  ocultarImagen(reserva: any): void {
    reserva.mostrarImagen = false;
  }

}
