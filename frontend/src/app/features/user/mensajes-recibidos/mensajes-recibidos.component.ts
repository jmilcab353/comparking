import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../../core/services/mensajes.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mensajes-recibidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mensajes-recibidos.component.html',
  styleUrl: './mensajes-recibidos.component.css'
})
export class MensajesRecibidosComponent implements OnInit {

  mensajes: any[] = [];
  mensajesPaginados: any[] = [];

  paginaActual: number = 1;
  mensajesPorPagina: number = 4;
  totalPaginas: number = 1;
  paginas: number[] = [];

  mensajeAEliminar: number | null = null;

  constructor(private mensajesService: MensajesService) { }

  ngOnInit(): void {
    const loginData = sessionStorage.getItem('LOGIN');
    const id = loginData ? JSON.parse(loginData).user.id : null;
    if (!id) return;

    this.mensajesService.getRecibidosPorUsuario(id).subscribe({
      next: (data) => {
        this.mensajes = data.sort((a, b) => new Date(b.fechaEnvio).getTime() - new Date(a.fechaEnvio).getTime());
        this.totalPaginas = Math.ceil(this.mensajes.length / this.mensajesPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        this.actualizarPaginacion();
      }
    });
  }

  actualizarPaginacion(): void {
    const start = (this.paginaActual - 1) * this.mensajesPorPagina;
    this.mensajesPaginados = this.mensajes.slice(start, start + this.mensajesPorPagina);
  }

  cambiarPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
    this.actualizarPaginacion();
  }

  confirmarEliminacion(id: number): void {
    this.mensajeAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.mensajeAEliminar = null;
  }

  eliminarConfirmado(): void {
    if (this.mensajeAEliminar === null) return;

    this.mensajesService.eliminarMensaje(this.mensajeAEliminar).subscribe({
      next: () => {
        this.mensajes = this.mensajes.filter(m => m.id !== this.mensajeAEliminar);
        this.totalPaginas = Math.ceil(this.mensajes.length / this.mensajesPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas || 1;
        this.actualizarPaginacion();
        this.mensajeAEliminar = null;
      },
      error: () => {
        console.error('Error al eliminar mensaje');
        this.mensajeAEliminar = null;
      }
    });
  }
}
