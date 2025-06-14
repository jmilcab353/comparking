import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {
  private apiUrl = 'http://localhost:9000/api/denuncias';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');
    let token = '';

    if (loginData) {
      try {
        token = JSON.parse(loginData).token;
      } catch (e) {
        console.error('Error parsing login token', e);
      }
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  crearDenuncia(dto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  getTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
