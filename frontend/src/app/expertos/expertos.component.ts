import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { EspecialidadesService } from '../service/especialidades.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-expertos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './expertos.component.html',
  styleUrls: ['./expertos.component.css']
})
export class ExpertosComponent implements OnInit {
  usuarios: any[] = [];
  especialidades: any[] = [];
  usuarioForm!: FormGroup;
  isEditing = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private especialidadesService: EspecialidadesService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group(
      {
        id: [null], // Añadimos el campo 'id' al formulario
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        password2: ['', [Validators.required]],
        especialidadId: [null, [Validators.required]]
      },
      { validators: this.passwordMatchValidator } // Aquí se usa AbstractControlOptions
    );

    this.loadUsuarios();
    this.loadEspecialidades();
  }

  loadUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: () => (this.errorMessage = 'No hay usuarios disponibles')
    });
  }

  loadEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe({
      next: (data) => (this.especialidades = data),
      error: () => (this.errorMessage = 'No hay especialidades disponibles')
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    const usuario = { ...this.usuarioForm.value }; // Copiamos los valores del formulario

    if (this.usuarioForm.get('id')?.value) {
      // Si hay un 'id', es una actualización
      this.usuariosService.updateUsuario(this.usuarioForm.get('id')?.value, usuario).subscribe({
        next: () => {
          this.loadUsuarios();
          this.resetForm();
        },
        error: () => (this.errorMessage = 'Error al actualizar usuario')
      });
    } else {
      // Si no hay un 'id', es una creación (eliminamos el campo 'id' antes de enviar)
      delete usuario.id; // Eliminamos el campo 'id' para la creación
      this.usuariosService.createUsuario(usuario).subscribe({
        next: () => {
          this.loadUsuarios();
          this.resetForm();
        },
        error: () => (this.errorMessage = 'Error al crear usuario')
      });
    }
  }

  editUsuario(usuario: any): void {
    const especialidad = this.especialidades.find(e => e.nombre === usuario.especialidad);

    this.usuarioForm.patchValue({
      id: usuario.id, // Asignamos el 'id' al formulario
      username: usuario.username,
      // especialidadId: usuario.especialidadId
      especialidadId: especialidad ? especialidad.id : null
    });
    this.isEditing = true;
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => this.loadUsuarios(),
        error: () => (this.errorMessage = 'Error al eliminar usuario')
      });
    }
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.isEditing = false;
    this.errorMessage = '';
  }

  // Validador de contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;
    return password === password2 ? null : { passwordMismatch: true };
  }

}
