import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: string;
  pass: string;
  errorMessage: string = "";

  constructor(private servicioLogin: LoginService, private route: Router) {
    this.user = "";
    this.pass = "";
  }

  // login(): void {
  //   this.servicioLogin.login(this.user, this.pass).subscribe((v) => {
  //     if (v.funciona) {
  //       if (v.perfil == "ROLE_ADMIN") {
  //         this.route.navigate(['/admin']);
  //       } else {
  //         this.route.navigate(['/experto']);
  //       }
  //     } else {
  //       alert("Error");
  //     }
  //   });
  // }

  login(): void {
    this.servicioLogin.login(this.user, this.pass).subscribe({
      next: (v) => {
        if (v.funciona) {
          if (v.perfil == "ROLE_ADMIN") {
            this.route.navigate(['/admin']);
          } else {
            this.route.navigate(['/experto']);
          }
        } else {
          this.errorMessage = "Credenciales incorrectas."; // Mensaje de error
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = "Usuario o contraseña incorrectos.";
        } else {
          this.errorMessage = "Error desconocido. Intente nuevamente.";
        }
      }
    });
  }
  
}
