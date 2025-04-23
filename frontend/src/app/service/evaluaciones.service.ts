import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {
  private apiUrl = 'http://localhost:9000/api/evaluaciones';

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

  // Crear una nueva evaluación
  evaluar(idExperto: number, evaluacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idExperto}`, evaluacion, { headers: this.getHeaders() });
  }

  // Obtener evaluación por ID
  getEvaluacionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtener todas las evaluaciones
  getAllEvaluaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Eliminar una evaluación por ID
  deleteEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtener ganadores por especialidad
  getGanadoresByEspecialidad(idEspecialidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ganadores/${idEspecialidad}`, { headers: this.getHeaders() });
  }

  isEvaluado(idParticipante: number, idPrueba: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/evaluado/${idParticipante}/${idPrueba}`, { headers: this.getHeaders() })
      .pipe(
        map(response => {
          return response; // Directamente devolvemos el booleano
        }),
        catchError(error => {
          return of(false); // Si hay error, retornamos false
        })
      );
  }

}
