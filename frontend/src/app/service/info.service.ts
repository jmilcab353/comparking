import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private apiUrl = 'http://localhost:9000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');

    let token = '';
    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        token = parsedData.token; // Extrae el token correctamente
      } catch (error) {
        console.error('Error parsing LOGIN data from sessionStorage', error);
      }
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }
  
}
