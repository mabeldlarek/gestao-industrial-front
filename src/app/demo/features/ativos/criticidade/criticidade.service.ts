import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class CriticidadeService {

  private readonly criticidadeUrl = 
    `${environment.apiUrl}/manutencao/criticidades`; // Ajuste o endpoint conforme seu backend

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  create(payload: any): Observable<any> {
    return this.http.post(this.criticidadeUrl, payload, {
      headers: this.getHeaders(),
      observe: 'response',
      responseType: 'text'
    });
  }

  list(): Observable<any> {
    return this.http.get(this.criticidadeUrl, { 
      headers: this.getHeaders() 
    });
  }

  getById(id: string): Observable<any> {
    const url = `${this.criticidadeUrl}/${id}`;
    return this.http.get(url, { 
      headers: this.getHeaders() 
    });
  }

  update(id: string, payload: any): Observable<any> {
    const url = `${this.criticidadeUrl}/${id}`;
    return this.http.put(url, payload, { 
      headers: this.getHeaders() 
    });
  }

  delete(id: string): Observable<any> {
    const url = `${this.criticidadeUrl}/${id}`;
    return this.http.delete(url, { 
      headers: this.getHeaders() 
    });
  }
}