import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciasService } from '../../../core/services/denuncias.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mod-denuncias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mod-denuncias.component.html',
  styleUrl: './mod-denuncias.component.css'
})
export class ModDenunciasComponent implements OnInit {

  denuncias: any[] = [];
  estado: 'cargando' | 'ok' | 'vacio' | 'error' = 'cargando';
  errorMsg = '';
  modalConfirmacionId: number | null = null;

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

  confirmarDenuncia(id: number) {
    this.denunciasService.actualizarEstado(id, 'revisada').subscribe({
      next: () => this.cargarDenuncias(),
      error: () => alert('No se pudo actualizar el estado.')
    });
  }

  eliminarDenuncia(id: number) {
    this.denunciasService.eliminar(id).subscribe({
      next: () => this.cargarDenuncias(),
      error: () => alert('No se pudo eliminar la denuncia.')
    });
  }

  abrirModal(id: number) {
    this.modalConfirmacionId = id;
  }

  cerrarModal() {
    this.modalConfirmacionId = null;
  }
}
