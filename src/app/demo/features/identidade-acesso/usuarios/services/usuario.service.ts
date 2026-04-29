import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserCreateRequest } from "../models/user-create-request.model";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly usuarioUrl =
    `${environment.apiUrl}/identidade/usuarios`;


  constructor(private http: HttpClient) { }

  create(payload: UserCreateRequest): Observable<any> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.usuarioUrl, payload, {
      headers,
      observe: 'response',
      responseType: 'text'
    });
  }

  list(): Observable<any> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.usuarioUrl, { headers });
  }

  delete(id: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.usuarioUrl}/${id}`;

    return this.http.delete(url, { headers });
  }

  update(id: string, payload: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.usuarioUrl}/${id}`; 

    console.log(payload);

    return this.http.put(url, payload, { headers });
  }
}