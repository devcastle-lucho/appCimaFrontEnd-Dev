import { BASE_ENDPOINT, HTTP_OPTIONS } from './../config/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AnioLectivo } from './../models/aniolectivo.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnioLectivoService {
  private baseEndpoint = BASE_ENDPOINT + '/aniolectivo';
  private cabeceras: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabeceras = HTTP_OPTIONS.headers;
  }

  public listarActivos(): Observable<AnioLectivo[]> {
    return this.http.get<AnioLectivo[]>(`${this.baseEndpoint}/listar-activo`,
    {headers: this.cabeceras});
  }
}
