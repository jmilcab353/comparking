import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  private apiUrl = 'http://localhost:9000/api/pruebas';

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

  // Obtener todas las pruebas
  getPruebas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener una prueba por su ID
  getPrueba(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtener pruebas por especialidad
  getPruebasByEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidad/${especialidadId}`, { headers: this.getHeaders() });
  }

  // Crear una nueva prueba
  createPrueba(prueba: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, prueba, { headers: this.getHeaders() });
  }

  // Actualizar una prueba existente
  updatePrueba(id: number, prueba: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, prueba, { headers: this.getHeaders() });
  }

  // Eliminar una prueba por su ID
  deletePrueba(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Subir un archivo PDF para una prueba específica
  uploadPdf(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Obtén el token directamente desde getHeaders()
    const token = this.getHeaders().get('Authorization');

    // Configura los headers sin Content-Type
    const headers = new HttpHeaders({
      'Authorization': token || '' // Asegúrate de que el token no sea undefined
    });

    return this.http.post<any>(`${this.apiUrl}/${id}/pdf`, formData, { headers: headers });
  }

  viewPdf(ruta: string): void {
    const backendUrl = 'http://localhost:9000/api/files/';

    // Normalizar la ruta (reemplazar "\" por "/")
    const normalizedRuta = ruta.replace(/\\/g, '/');
    const filename = normalizedRuta.split('/').pop();

    if (filename) {
      const fileUrl = backendUrl + filename;

      // Crear un encabezado con el token
      const headers = new HttpHeaders({
        'Authorization': this.getHeaders().get('Authorization') || ''
      });

      // Abrir la URL en una nueva pestaña con autenticación
      this.http.get(fileUrl, { headers, responseType: 'blob' }).subscribe(blob => {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      }, error => {
        console.error('Error al abrir el PDF:', error);
      });

    } else {
      console.error('Error: No se pudo obtener el nombre del archivo.');
    }
  }

}
