import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
  private apiUrl = 'http://localhost:9000/api/participantes';
  private publicApiUrl = 'http://localhost:9000/api/public/participantes';

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

  getParticipantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Este método accede a la API pública sin token JWT para poder visualizar los participantes
  getParticipantesPublic(): Observable<any[]> {
    return this.http.get<any[]>(`${this.publicApiUrl}`, { headers: this.getHeaders() });
  }

  getParticipante(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getParticipantesEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidad/${especialidadId}`, { headers: this.getHeaders() });
  }

  createParticipante(participante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, participante, { headers: this.getHeaders() });
  }

  updateParticipante(id: number, participante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, participante, { headers: this.getHeaders() });
  }

  deleteParticipante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

}
