import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { ReviewsService } from '../../../core/services/reviews.service';

@Component({
  selector: 'app-resena-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resena-app.component.html',
  styleUrl: './resena-app.component.css',
  providers: [ReviewsService]
})
export class ResenaAppComponent {
  puntuacion: number = 0;
  comentario: string = '';
  error: string = '';
  mensaje: string = '';
  userId: number = 0;
  enviando: boolean = false; // NUEVO

  constructor(
    private usuariosService: UsuariosService,
    private reviewsService: ReviewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuariosService.getMisDatos().subscribe({
      next: data => this.userId = data.id,
      error: () => this.error = 'Error al obtener tus datos.'
    });
  }

  seleccionarPuntuacion(valor: number): void {
    this.puntuacion = valor;
  }

  enviarResena(): void {
    this.error = '';

    if (!this.comentario || this.puntuacion < 1 || this.puntuacion > 5) {
      this.error = 'Debes seleccionar una puntuación entre 1 y 5 y escribir un comentario.';
      return;
    }

    if (this.comentario.length > 300) {
      this.error = 'El comentario no puede superar los 300 caracteres.';
      return;
    }

    this.enviando = true; // BLOQUEAR BOTÓN

    const dto = {
      userId: this.userId,
      puntuacion: this.puntuacion,
      comentario: this.comentario,
      fecha: new Date().toISOString()
    };

    this.reviewsService.crearResena(dto).subscribe({
      next: () => {
        this.mensaje = '¡Gracias por tu reseña!';
        setTimeout(() => {
          this.enviando = false;
          this.router.navigate(['/aparcamientos']);
        }, 2000);
      },
      error: () => {
        this.enviando = false;
        this.error = 'No se pudo enviar la reseña.';
      }
    });
  }
}