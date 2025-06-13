import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AparcamientosService } from '../../../core/services/aparcamientos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-aparcamientos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-aparcamientos.component.html',
  styleUrls: ['./mis-aparcamientos.component.css']
})
export class MisAparcamientosComponent implements OnInit {
  aparcamientos: any[] = [];
  userId!: number;
  mensaje = '';
  mostrarModalEliminar = false;
  aparcamientoAEliminar: any = null;

  tituloBreadcrumb = 'Mis aparcamientos';

  constructor(private aparcamientosService: AparcamientosService) {
    const login = JSON.parse(sessionStorage.getItem('LOGIN')!);
    this.userId = login.user.id;
  }

  ngOnInit(): void {
    this.cargarAparcamientos();
  }

  cargarAparcamientos(): void {
    this.aparcamientosService.getAparcamientosDelUsuario(this.userId).subscribe({
      next: (data) => this.aparcamientos = data ?? [],
      error: () => {
        this.aparcamientos = [];
        this.mensaje = 'Error al cargar tus aparcamientos.';
      }
    });
  }

  abrirModalEliminar(aparcamiento: any): void {
    this.aparcamientoAEliminar = aparcamiento;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.aparcamientoAEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.aparcamientoAEliminar) {
      this.aparcamientosService.eliminarAparcamiento(this.aparcamientoAEliminar.id).subscribe({
        next: () => {
          this.cargarAparcamientos();
          this.cerrarModalEliminar();
        },
        error: () => {
          this.mensaje = 'Error al eliminar el aparcamiento.';
          this.cerrarModalEliminar();
        }
      });
    }
  }
}
