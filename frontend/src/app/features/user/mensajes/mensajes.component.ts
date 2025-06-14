import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MensajesService } from '../../../core/services/mensajes.service';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  filtro: string = '';
  receptorSeleccionado: any = null;
  contenido: string = '';

  mensajeEnviado: boolean = false;
  errorMsg: string | null = null;
  enviando: boolean = false;
  mostrarModal: boolean = false;

  idUsuarioLogueado: number = 0;

  constructor(
    private mensajesService: MensajesService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    const loginData = sessionStorage.getItem('LOGIN');
    if (loginData) {
      this.idUsuarioLogueado = Number(JSON.parse(loginData).user.id);
    }

    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data
          .map(u => ({
            id: Number(u.idUser),
            nombre: u.nombre,
            email: u.username
          }))
          .filter(u => u.id !== this.idUsuarioLogueado);

        this.usuariosFiltrados = [...this.usuarios];
      },
      error: () => this.usuarios = []
    });
  }

  filtrarUsuarios(): void {
    const f = this.filtro.toLowerCase().trim();
    this.usuariosFiltrados = this.usuarios
      .filter(u => {
        const nombre = u.nombre?.toLowerCase() || '';
        const email = u.email?.toLowerCase() || '';
        return nombre.includes(f) || email.includes(f);
      });
  }

  seleccionarReceptor(u: any): void {
    this.receptorSeleccionado = u;
    this.filtro = `${u.nombre} (${u.email})`;
    this.usuariosFiltrados = [];
  }

  limpiarSeleccion(): void {
    this.receptorSeleccionado = null;
    this.filtro = '';
    this.usuariosFiltrados = [...this.usuarios];
  }

  enviarMensaje(): void {
    this.errorMsg = null;
    this.mensajeEnviado = false;

    if (!this.receptorSeleccionado?.id) {
      this.errorMsg = 'Seleccione un receptor para enviar el mensaje.';
      return;
    }

    if (!this.contenido.trim()) {
      this.errorMsg = 'Escriba un mensaje para continuar.';
      return;
    }

    const dto = {
      emisorId: this.idUsuarioLogueado,
      receptorId: this.receptorSeleccionado.id,
      contenido: this.contenido.trim(),
      fechaEnvio: new Date().toISOString().slice(0, 19)
    };

    this.enviando = true;
    this.mensajesService.enviarMensaje(dto).subscribe({
      next: () => {
        this.receptorSeleccionado = null;
        this.contenido = '';
        this.filtro = '';
        this.usuariosFiltrados = [...this.usuarios];
        this.mostrarModal = true;
      },
      error: (err) => {
        console.error('Error al enviar mensaje:', err);
        this.errorMsg = 'Ha ocurrido un error inesperado.';
      },
      complete: () => this.enviando = false
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
