import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialidadesService } from '../service/especialidades.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  especialidades: any[] = [];
  especialidadForm!: FormGroup;
  isEditing = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private especialidadesService: EspecialidadesService
  ) { }

  ngOnInit(): void {
    this.especialidadForm = this.fb.group({
      id: [null], // Añadimos el campo 'id' al formulario
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]]
    });

    this.loadEspecialidades();
  }

  loadEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe({
      next: (data) => (this.especialidades = data),
      error: (error) => (this.errorMessage = 'No hay especialidades disponibles')
    });
  }

  onSubmit(): void {
    if (this.especialidadForm.invalid) return;

    const especialidad = this.especialidadForm.value;

    if (this.especialidadForm.get('id')?.value) {
      // Si hay un 'id', es una actualización
      this.especialidadesService.updateEspecialidad(this.especialidadForm.get('id')?.value, especialidad).subscribe({
        next: () => {
          this.loadEspecialidades();
          this.resetForm();
        },
        error: (error) => (this.errorMessage = 'Error al actualizar especialidad')
      });
    } else {
      // Si no hay un 'id', es una creación
      this.especialidadesService.createEspecialidad(especialidad).subscribe({
        next: () => {
          this.loadEspecialidades();
          this.resetForm();
        },
        error: (error) => (this.errorMessage = 'Error al crear especialidad')
      });
    }
  }

  editEspecialidad(especialidad: any): void {
    this.especialidadForm.patchValue({
      id: especialidad.id, // Asignamos el 'id' al formulario
      nombre: especialidad.nombre,
      codigo: especialidad.codigo
    });
    this.isEditing = true;
  }

  deleteEspecialidad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
      this.especialidadesService.deleteEspecialidad(id).subscribe({
        next: () => this.loadEspecialidades(),
        error: (error) => (this.errorMessage = 'Error al eliminar especialidad')
      });
    }
  }

  resetForm(): void {
    this.especialidadForm.reset();
    this.isEditing = false;
    this.errorMessage = '';
  }
  
}
