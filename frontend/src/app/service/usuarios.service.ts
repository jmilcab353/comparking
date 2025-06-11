import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:9000/api/usuarios';

  constructor(private http: HttpClient) { }

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

  getMisDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }

  createUsuario(usuario: any): Observable<any> {
    const apiUrl = 'http://localhost:9000/auth/register';
    return this.http.post<any>(apiUrl, usuario, { headers: this.getHeaders() });
  }

  updateUsuario(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, datos, { headers: this.getHeaders() });
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  actualizarPassword(id: number, body: { nuevaPassword: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/password`, body, { headers: this.getHeaders() });
  }

  subirFoto(id: number, formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/${id}/foto`, formData, {
      headers: this.getHeaders().delete('Content-Type'), // ⚠️ multipart sin Content-Type
      responseType: 'text' // porque el backend devuelve una URL como texto
    });
  }

}
