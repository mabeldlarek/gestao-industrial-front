import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserCreateRequest } from "../models/user-create-request.model";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly createUsuarioUrl =
    `${environment.apiUrl}/identidade/usuarios`;

  constructor(private http: HttpClient) { }

  create(payload: UserCreateRequest): Observable<any> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(this.createUsuarioUrl, payload, {
      headers,
      observe: 'response',
      responseType: 'text'
    });
  }
}