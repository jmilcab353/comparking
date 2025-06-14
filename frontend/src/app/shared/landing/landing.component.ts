import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  resenas: any[] = [];
  resenasAleatorias: any[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getTodasResenas().subscribe({
      next: (data) => {
        this.resenas = data;
        this.resenasAleatorias = this.obtenerAleatorias(this.resenas, 6);
      },
      error: () => console.error('Error al cargar reseñas.')
    });
  }

  obtenerAleatorias(lista: any[], cantidad: number): any[] {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, cantidad);
  }

  isLogged(): boolean {
    return sessionStorage.getItem('LOGIN') !== null;
  }
}