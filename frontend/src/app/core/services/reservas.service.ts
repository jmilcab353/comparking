import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:9000/api/reservas';

  constructor(private http: HttpClient) { }

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

  crearReserva(reserva: any): Observable<any> {
    return this.http.post(this.apiUrl, reserva, { headers: this.getHeaders() });
  }

  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

}
