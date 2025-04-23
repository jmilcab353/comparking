import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  perfil: string; // admin, experto
  logged: boolean;
  user: any; // objeto con los datos del usuario


  constructor(private http: HttpClient) {
    this.token = "";
    this.perfil = "";
    this.logged = false;
    this.user = {};
  }

  private almacenar() {
    var objeto: any;
    objeto = {
      token: this.token,
      perfil: this.perfil,
      logged: this.logged,
      user: this.user
    }
    sessionStorage.setItem("LOGIN", JSON.stringify(objeto));
  }

  recuperar() {

    var cadena: any;

    cadena = sessionStorage.getItem("LOGIN") || "";

    if (cadena != "") {

      var objeto = JSON.parse(cadena);

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
    let objeto: any = this;

    return this.http.post("http://localhost:9000/auth/login", {
      // return this.http.post("http://localhost/servidor_skills/login.php", {
      username: user,
      password: pass
    }).pipe(
      map((data: any) => {
        if (data != null && data.token != "") {
          // console.log(data);
          objeto.user = { nombre: data.user };
          objeto.perfil = data.role;
          objeto.logged = true;
          objeto.token = data.token;
          objeto.almacenar();
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

  // logout() {

  //   let objeto: any = this;
  //   let contenido: string | null = sessionStorage.getItem("LOGIN");

  //   this.http.get("http://localhost/servidor_skills/login.php?desloguear=" + JSON.parse(contenido || '').token)
  //     .subscribe(function (data: any) {
  //       objeto.machacar();
  //     })
  // }

  logout() {
    let objeto: any = this;

    // Eliminar los datos de sesión (el token y otros datos relacionados)
    sessionStorage.removeItem("LOGIN");

    // Actualizar el estado del cliente para reflejar que ya no está logueado
    objeto.machacar();
  }

  isLogged(): boolean {

    let respuesta: boolean = false;
    let contenido: string | null = sessionStorage.getItem("LOGIN");

    if (contenido) {
      respuesta = JSON.parse(contenido || '').logged;
    }

    return respuesta;
  }

  getNombre(): string {

    let respuesta: string = '';
    let contenido: string | null = sessionStorage.getItem("LOGIN");

    if (contenido) {
      respuesta = JSON.parse(contenido || '').user.nombre;
    }

    return respuesta;

  }

  getRole(): string {

    let contenido: string | null = sessionStorage.getItem("LOGIN");
    let respuesta: string = "";

    if (contenido) {
      respuesta = JSON.parse(contenido || '').perfil;
    }

    return respuesta;

  }

}
