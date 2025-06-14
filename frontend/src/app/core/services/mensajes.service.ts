import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrl = 'http://localhost:9000/api/mensajes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');
    let token = '';

    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        token = parsedData.token;
      } catch (e) {
        console.error('Error parsing login token', e);
      }
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener todos los mensajes
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener mensajes enviados por ID de usuario
  getEnviadosPorUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/emisor/${id}`, { headers: this.getHeaders() });
  }

  // Obtener mensajes recibidos por ID de usuario
  getRecibidosPorUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/receptor/${id}`, { headers: this.getHeaders() });
  }

  // Enviar nuevo mensaje
  enviarMensaje(mensaje: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mensaje, { headers: this.getHeaders() });
  }

  // Eliminar mensaje por ID
  eliminarMensaje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
