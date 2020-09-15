import { BASE_ENDPOINT, HTTP_OPTIONS } from './../config/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Grado } from './../models/grado.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private baseEndpoint = BASE_ENDPOINT + '/grado';
  private cabeceras: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabeceras = HTTP_OPTIONS.headers;
  }

  public listarNivelColegio(idNivel: number = 0): Observable<Grado[]> {
    return this.http.get<Grado[]>(`${this.baseEndpoint}/listar-nivelcolegio/${idNivel}`,
    {headers: this.cabeceras});
  }
}
