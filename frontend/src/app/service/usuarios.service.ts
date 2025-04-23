import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:9000/api/usuarios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');
    let token = '';

    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error parsing LOGIN data from sessionStorage', error);
      }
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createUsuario(usuario: any): Observable<any> {
    const apiUrl = 'http://localhost:9000/auth/register';  // URL del endpoint de registro
    return this.http.post<any>(apiUrl, usuario, { headers: this.getHeaders() });
  }

  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() });
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  
}
