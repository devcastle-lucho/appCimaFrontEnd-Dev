import { BASE_ENDPOINT, HTTP_OPTIONS } from './../config/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AreaAsignatura } from './../models/areaasignatura.model';
import { AreaAsignaturaVista } from './../models/dto/areaasignatura.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaAsignaturaService {
  private baseEndpoint = BASE_ENDPOINT + '/areaasignatura';
  private cabeceras: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabeceras = HTTP_OPTIONS.headers;
  }

  public listar(): Observable<AreaAsignatura[]> {
    return this.http.get<AreaAsignatura[]>(`${this.baseEndpoint}/listar`,
    {headers: this.cabeceras});
  }

  public listarPersonalizada(): Observable<AreaAsignaturaVista[]> {
    return this.http.get<AreaAsignaturaVista[]>(`${this.baseEndpoint}/listar/personalizada`,
    {headers: this.cabeceras});
  }
}
