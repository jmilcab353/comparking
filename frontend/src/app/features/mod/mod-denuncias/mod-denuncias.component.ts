import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciasService } from '../../../core/services/denuncias.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mod-denuncias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mod-denuncias.component.html',
  styleUrl: './mod-denuncias.component.css'
})
export class ModDenunciasComponent implements OnInit {

  denuncias: any[] = [];
  estado: 'cargando' | 'ok' | 'vacio' | 'error' = 'cargando';
  errorMsg = '';

  fechaFiltro: string = '';
  pageSize: number = 5;
  currentPage: number = 1;

  modalConfirmacionId: number | null = null;
  modalAccion: 'eliminar' | 'confirmar' | null = null;
  modalMensaje: string = '';
  bloqueado: boolean = false;

  constructor(private denunciasService: DenunciasService) { }

  ngOnInit(): void {
    this.cargarDenuncias();
  }

  cargarDenuncias() {
    this.denunciasService.getTodas().subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.estado = 'vacio';
        } else {
          this.denuncias = data;
          this.estado = 'ok';
        }
      },
      error: () => {
        this.estado = 'error';
        this.errorMsg = 'No se pudieron cargar las denuncias.';
      }
    });
  }

  get denunciasFiltradas(): any[] {
    let filtradas = this.denuncias;

    if (this.fechaFiltro) {
      filtradas = filtradas.filter(d =>
        new Date(d.fecha).toISOString().slice(0, 10) === this.fechaFiltro
      );
    }

    return filtradas;
  }

  get totalPages(): number {
    return Math.ceil(this.denunciasFiltradas.length / this.pageSize);
  }

  get paginaActual(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.denunciasFiltradas.slice(start, start + this.pageSize);
  }

  cambiarPagina(delta: number) {
    const nueva = this.currentPage + delta;
    if (nueva >= 1 && nueva <= this.totalPages) {
      this.currentPage = nueva;
    }
  }

  abrirModal(id: number, accion: 'eliminar' | 'confirmar') {
    this.modalConfirmacionId = id;
    this.modalAccion = accion;
    this.modalMensaje = '';
    this.bloqueado = false;
  }

  cerrarModal() {
    this.modalConfirmacionId = null;
    this.modalAccion = null;
    this.modalMensaje = '';
    this.bloqueado = false;
  }

  confirmarAccion() {
    if (!this.modalConfirmacionId || !this.modalAccion) return;

    this.bloqueado = true;

    if (this.modalAccion === 'eliminar') {
      this.denunciasService.eliminar(this.modalConfirmacionId).subscribe({
        next: () => {
          this.modalMensaje = 'Denuncia eliminada';
          setTimeout(() => {
            this.cargarDenuncias();
            this.cerrarModal();
          }, 2000);
        },
        error: () => {
          this.modalMensaje = 'Error al eliminar';
          this.bloqueado = false;
        }
      });
    } else if (this.modalAccion === 'confirmar') {
      this.denunciasService.actualizarEstado(this.modalConfirmacionId, 'revisada').subscribe({
        next: () => {
          this.modalMensaje = 'Estado actualizado';
          setTimeout(() => {
            this.cargarDenuncias();
            this.cerrarModal();
          }, 2000);
        },
        error: () => {
          this.modalMensaje = 'Error al actualizar';
          this.bloqueado = false;
        }
      });
    }
  }
  
}
