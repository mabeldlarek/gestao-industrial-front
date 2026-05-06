import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class MedidorService {

  private readonly medidorUrl = `${environment.apiUrl}/manutencao/medidores`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  create(payload: any): Observable<any> {
    return this.http.post(this.medidorUrl, payload, {
      headers: this.getHeaders(),
      observe: 'response',
      responseType: 'text'
    });
  }

  list(): Observable<any> {
    return this.http.get(this.medidorUrl, { headers: this.getHeaders() });
  }

  update(id: string, payload: any): Observable<any> {
    const url = `${this.medidorUrl}/${id}`;
    return this.http.put(url, payload, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    const url = `${this.medidorUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}