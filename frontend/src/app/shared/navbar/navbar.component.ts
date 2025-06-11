import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {LoginService} from '../../core/services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  perfil : string;
  nombre : string;

  constructor(private router: Router, private loginService: LoginService) {

    this.perfil = "";
    this.nombre = "";

  }

  logout() {
    this.loginService.logout();
    this.nombre="";
    // Habría que esperar la respuesta del servidor para verificar que hay logout
    // this.router.navigate(['/']);
    this.router.navigate(['/bye']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loginService.isLogged();
  }

  getNombre(): string {
    return this.loginService.getNombre();
  }

  getPerfil(): string {
    return this.loginService.getRole();
  }

}
