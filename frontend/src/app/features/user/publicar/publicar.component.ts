import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AparcamientosService } from '../../../core/services/aparcamientos.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { Router, RouterModule } from '@angular/router';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-publicar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './publicar.component.html'
})
export class PublicarComponent {
  aparcamiento: any = {
    direccion: '',
    localidad: '',
    provincia: '',
    ancho: null,
    largo: null,
    precioHora: null,
    precioDia: null,
    techado: false,
    detalles: '',
    imagen: ''
  };

  previewUrl: string = '';
  mensaje = '';
  userId!: number;
  errorMessage = '';

  tituloBreadcrumb = 'Publicar aparcamiento';

  constructor(
    private aparcamientosService: AparcamientosService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    const login = JSON.parse(sessionStorage.getItem('LOGIN')!);
    this.userId = login.user.id;
  }

  publicar(): void {
    this.errorMessage = '';
    this.mensaje = '';

    if (!this.aparcamiento.direccion || this.aparcamiento.direccion.trim().length === 0) {
      this.errorMessage = 'La dirección es obligatoria.';
    } else if (!this.aparcamiento.localidad || this.aparcamiento.localidad.trim().length === 0) {
      this.errorMessage = 'La localidad es obligatoria.';
    } else if (!this.aparcamiento.provincia || this.aparcamiento.provincia.trim().length === 0) {
      this.errorMessage = 'La provincia es obligatoria.';
    } else if (!this.aparcamiento.ancho || this.aparcamiento.ancho <= 0) {
      this.errorMessage = 'El ancho debe ser mayor que 0.';
    } else if (!this.aparcamiento.largo || this.aparcamiento.largo <= 0) {
      this.errorMessage = 'El largo debe ser mayor que 0.';
    } else if (!this.aparcamiento.precioHora || this.aparcamiento.precioHora <= 0) {
      this.errorMessage = 'El precio por hora debe ser mayor que 0.';
    } else if (!this.aparcamiento.precioDia || this.aparcamiento.precioDia <= 0) {
      this.errorMessage = 'El precio por día debe ser mayor que 0.';
    } else {
      const dto = {
        ...this.aparcamiento,
        userId: this.userId
      };

      this.aparcamientosService.createAparcamiento(dto).subscribe({
        next: () => {
          this.mensaje = 'Aparcamiento publicado correctamente.';
          this.previewUrl = '';

          // Esperamos dos segundos
          setTimeout(() => {
            this.router.navigate(['/aparcamientos/publicados']);
          }, 2000);
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al publicar el aparcamiento.';
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.previewUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('file', file);

      this.aparcamientosService.uploadImagenAparcamiento(formData).subscribe({
        next: (url) => {
          this.aparcamiento.imagen = url;
          this.mensaje = 'Imagen subida correctamente.';
        },
        error: () => {
          this.mensaje = 'No se pudo subir la imagen.';
        }
      });
    }
  }

}
