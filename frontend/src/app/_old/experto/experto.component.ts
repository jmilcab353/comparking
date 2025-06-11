import {Component, OnInit} from '@angular/core';
import {InfoService} from '../../core/services/info.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-experto',
  templateUrl: './experto.component.html',
  styleUrls: ['./experto.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ExpertoComponent implements OnInit {
  userName: string = '';
  especialidad: string = '';

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    // Obtener datos del usuario
    this.infoService.getUserData().subscribe(
      (data) => {
        // Asignar los datos a las propiedades
        this.userName = data.username; // Nombre del usuario
        this.especialidad = data.especialidad; // Especialidad del usuario
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
