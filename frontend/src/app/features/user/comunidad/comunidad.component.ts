import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})
export class ComunidadComponent implements OnInit {
  logueado = false;
  tituloBreadcrumb = 'Comunidad';

  ngOnInit(): void {
    this.logueado = sessionStorage.getItem('LOGIN') !== null;
  }
}
