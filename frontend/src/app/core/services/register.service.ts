import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = "http://localhost:9000/auth/register";

  constructor(private http: HttpClient) {}

  register(data: { username: string, password: string, password2: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
