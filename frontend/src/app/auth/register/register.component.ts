import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../service/register.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: string = '';
  pass1: string = '';
  pass2: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router
  ) { }

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.user || !this.pass1 || !this.pass2) {
      this.errorMessage = 'Todos los campos son obligatorios.';
    } else if (!this.user.includes('@')) {
      this.errorMessage = 'El correo electrónico no es válido.';
    } else if (this.pass1 !== this.pass2) {
      this.errorMessage = 'Las contraseñas no coinciden.';
    } else if (this.pass1.length < 4) {
      this.errorMessage = 'La contraseña debe tener al menos 4 caracteres.';
    } else {
      const body = {
        username: this.user,
        password: this.pass1,
        password2: this.pass2
      };

      this.registerService.register(body).subscribe({
        next: () => {
          this.successMessage = 'Usuario registrado correctamente.';
          this.loginService.login(this.user, this.pass1).subscribe({
            next: (v) => {
              if (v.funciona) {
                if (v.perfil === "ROLE_ADMIN") {
                  this.router.navigate(['/admin/usuarios']);
                } else if (v.perfil === "ROLE_MOD") {
                  this.router.navigate(['/mod/anuncios']);
                } else {
                  this.router.navigate(['/usuario/perfil']);
                }
              }
            }
          });
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al registrar el usuario.';
        }
      });
    }
  }
}
