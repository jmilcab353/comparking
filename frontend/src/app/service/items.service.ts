import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:9000/api/items';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const loginData = sessionStorage.getItem('LOGIN');
    let token = '';
    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        token = parsedData.token;
      } catch (error) {
        console.error('Error al parsear el token de sessionStorage', error);
      }
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtiene los ítems asociados a una prueba determinada
  getItemsByPrueba(pruebaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prueba/${pruebaId}`, { headers: this.getHeaders() });
  }

  // Crea un nuevo ítem
  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item, { headers: this.getHeaders() });
  }

  // Actualiza un ítem existente
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item, { headers: this.getHeaders() });
  }

  // Elimina un ítem por su ID
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

}
