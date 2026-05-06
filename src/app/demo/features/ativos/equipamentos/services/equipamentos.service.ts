import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EquipamentoRequest } from "../models/equipamento.model";

@Injectable({ providedIn: 'root' })
export class EquipamentoService {

  private readonly apiUrl = `${environment.apiUrl}/ativos/equipamentos`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  create(payload: EquipamentoRequest): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      headers: this.getHeaders(),
      observe: 'response',
      responseType: 'text'
    });
  }

  list(): Observable<EquipamentoRequest[]> {
    return this.http.get<EquipamentoRequest[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  update(id: string, payload: EquipamentoRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}