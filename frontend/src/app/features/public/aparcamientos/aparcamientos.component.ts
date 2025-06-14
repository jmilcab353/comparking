import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aparcamientos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aparcamientos.component.html',
  styleUrls: ['./aparcamientos.component.css']
})
export class AparcamientosComponent implements OnInit {
  logueado = false;
  perfil: string = '';

  ngOnInit(): void {
    const session = sessionStorage.getItem('LOGIN');
    if (session) {
      const datos = JSON.parse(session);
      this.logueado = datos.logged;
      this.perfil = datos.perfil;
    }
  }

  get bloqueado(): boolean {
    return !this.logueado || this.perfil === 'ROLE_ADMIN' || this.perfil === 'ROLE_MOD';
  }
}
