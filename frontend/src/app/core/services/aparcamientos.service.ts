import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AparcamientosService {
  private apiUrl = 'http://localhost:9000/api/aparcamientos';

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

  getAparcamientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAparcamiento(dto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto, { headers: this.getHeaders() });
  }

  uploadImagenAparcamiento(formData: FormData): Observable<string> {
    return this.http.post('http://localhost:9000/api/aparcamientos/upload', formData, {
      headers: this.getHeaders().delete('Content-Type'),
      responseType: 'text'
    });
  }

  getAparcamientosDelUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`, {
      headers: this.getHeaders()
    });
  }

  eliminarAparcamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

}