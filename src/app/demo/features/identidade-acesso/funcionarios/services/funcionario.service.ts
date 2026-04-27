import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserCreateRequest } from "../../usuarios/models/user-create-request.model";
import { FuncionarioCreateRequest } from "../models/funcionario-create-request.model";

@Injectable({ providedIn: 'root' })
export class FuncionarioService {

  private readonly funcionarioUrl =
    `${environment.apiUrl}/identidade/funcionarios`;


  constructor(private http: HttpClient) { }

  create(payload: FuncionarioCreateRequest): Observable<any> {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.funcionarioUrl, payload, {
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

    return this.http.get(this.funcionarioUrl, { headers });
  }

  delete(id: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.funcionarioUrl}/${id}`;

    return this.http.delete(url, { headers });
  }

  update(id: string, payload: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.funcionarioUrl}/${id}`; 

    console.log(payload);

    return this.http.put(url, payload, { headers });
  }
}