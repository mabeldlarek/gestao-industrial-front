import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly loginUrl =
    `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, payload);
  }
}
