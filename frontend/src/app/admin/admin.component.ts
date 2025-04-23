import { Component, OnInit } from '@angular/core';
import { InfoService } from '../service/info.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AdminComponent implements OnInit {
  userName: string = '';
  especialidad: string = '';

  constructor(private infoService: InfoService) { }

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

