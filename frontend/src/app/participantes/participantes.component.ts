import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantesService } from '../service/participantes.service';
import { InfoService } from '../service/info.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {
  participantes: any[] = [];
  participanteForm!: FormGroup;
  isEditing = false;
  errorMessage = '';
  especialidadId: number | null = null;
  especialidad: string = '';

  constructor(
    private fb: FormBuilder,
    private participantesService: ParticipantesService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.participanteForm = this.fb.group({
      id: [null], // Añadimos el campo 'id' al formulario
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      centro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]]
    });

    this.loadUserEspecialidad();
  }

  // Obtener la especialidad del usuario autenticado
  loadUserEspecialidad(): void {
    this.infoService.getUserData().subscribe({
      next: (userData) => {
        this.especialidadId = userData.idEspecialidad;
        this.especialidad = userData.especialidad;
        this.loadParticipantes();
      },
      error: () => {
        this.errorMessage = 'Error al obtener la información del usuario';
      }
    });
  }

  // Cargar participantes de la especialidad del usuario
  loadParticipantes(): void {
    if (this.especialidadId) {
      this.participantesService.getParticipantesEspecialidad(this.especialidadId).subscribe({
        next: (data) => (this.participantes = data),
        error: () => (this.errorMessage = 'Esta prueba no tiene participantes')
      });
    }
  }

  // Crear o actualizar un participante
  onSubmit(): void {
    if (this.participanteForm.invalid || !this.especialidadId) {
      this.errorMessage = 'Error: Verifica los datos del formulario';
      return;
    }

    const participante = { ...this.participanteForm.value, especialidadId: this.especialidadId };

    if (this.participanteForm.get('id')?.value) {
      // Si hay un 'id', es una actualización
      this.participantesService.updateParticipante(this.participanteForm.get('id')?.value, participante).subscribe({
        next: () => {
          this.loadParticipantes();
          this.resetForm();
        },
        error: () => (this.errorMessage = 'Error al actualizar participante')
      });
    } else {
      // Si no hay un 'id', es una creación
      this.participantesService.createParticipante(participante).subscribe({
        next: () => {
          this.loadParticipantes();
          this.resetForm();
        },
        error: () => (this.errorMessage = 'Error al crear participante')
      });
    }
  }

  // Editar un participante
  editParticipante(participante: any): void {
    this.participanteForm.patchValue({
      id: participante.id, // Asignamos el 'id' al formulario
      nombre: participante.nombre,
      apellidos: participante.apellidos,
      centro: participante.centro
    });
    this.isEditing = true;
  }

  // Eliminar un participante
  deleteParticipante(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este participante?')) {
      this.participantesService.deleteParticipante(id).subscribe({
        next: () => this.loadParticipantes(),
        error: () => (this.errorMessage = 'Error al eliminar participante')
      });
    }
  }

  // Resetear formulario
  resetForm(): void {
    this.participanteForm.reset();
    this.isEditing = false;
    this.errorMessage = '';
  }

}
