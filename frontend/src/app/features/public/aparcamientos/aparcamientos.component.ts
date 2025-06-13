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

  ngOnInit(): void {
    this.logueado = sessionStorage.getItem('LOGIN') !== null;
  }
}
