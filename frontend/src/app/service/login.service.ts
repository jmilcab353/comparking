import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  perfil: string;
  logged: boolean;
  user: any;

  constructor(private http: HttpClient) {
    this.token = "";
    this.perfil = "";
    this.logged = false;
    this.user = {};
  }

  private almacenar() {
    const objeto = {
      token: this.token,
      perfil: this.perfil,
      logged: this.logged,
      user: this.user
    };
    sessionStorage.setItem("LOGIN", JSON.stringify(objeto));
  }

  recuperar() {
    const cadena = sessionStorage.getItem("LOGIN") || "";

    if (cadena != "") {
      const objeto = JSON.parse(cadena);
      this.token = objeto.token;
      this.perfil = objeto.perfil;
      this.logged = objeto.logged;
      this.user = objeto.user;
    } else {
      this.token = "";
      this.perfil = "";
      this.logged = false;
      this.user = {};
    }
  }

  login(user: string, pass: string) {
    return this.http.post("http://localhost:9000/auth/login", {
      username: user,
      password: pass
    }).pipe(
      map((data: any) => {
        if (data != null && data.token != "") {
          this.user = { nombre: data.username };
          this.perfil = data.role;
          this.logged = true;
          this.token = data.token;
          this.almacenar();
          return { funciona: true, perfil: data.role };
        } else {
          return { funciona: false };
        }
      })
    );
  }

  private machacar() {
    sessionStorage.removeItem("LOGIN");
  }

  logout() {
    this.machacar();
  }

  isLogged(): boolean {
    const contenido = sessionStorage.getItem("LOGIN");
    return contenido ? JSON.parse(contenido).logged : false;
  }

  getNombre(): string {
    const contenido = sessionStorage.getItem("LOGIN");
    return contenido ? JSON.parse(contenido).user.nombre : '';
  }

  getRole(): string {
    const contenido = sessionStorage.getItem("LOGIN");
    return contenido ? JSON.parse(contenido).perfil : '';
  }
}
