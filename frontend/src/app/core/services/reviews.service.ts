import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private apiUrl = 'http://localhost:9000/api/app-reviews';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');
    let token = '';
    if (loginData) {
      try {
        token = JSON.parse(loginData).token;
      } catch (err) {
        console.error('Token malformado');
      }
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  crearResena(resena: any): Observable<any> {
    return this.http.post(this.apiUrl, resena, { headers: this.getHeaders() });
  }

  getMisResenas(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${userId}`, { headers: this.getHeaders() });
  }

  getTodasResenas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  eliminarResena(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
