import { BASE_ENDPOINT, HTTP_OPTIONS, TOKEN } from './../config/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanEstudio } from './../models/planestudio.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService {
   private baseEndpoint = BASE_ENDPOINT + '/planestudio';
   private cabeceras: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabeceras = HTTP_OPTIONS.headers;
  }

  public listar(): Observable<PlanEstudio[]> {
    return this.http.get<PlanEstudio[]>(`${this.baseEndpoint}/listar`,
    {headers: this.cabeceras});
  }

  public listarPaginacion(idAnioLectivo: number = 0, idGrado: number = 0): Observable<PlanEstudio[]> {
    return this.http.get<any>(`${this.baseEndpoint}/filtrar/aniolectivo/${idAnioLectivo}/grado/${idGrado}/pagina`,
    {headers: this.cabeceras});
  }

  public crear(planEstudio: PlanEstudio): Observable<PlanEstudio> {
    return this.http.post<PlanEstudio>(`${this.baseEndpoint}/`, planEstudio,
    {headers: this.cabeceras});
  }
  public editar(planEstudio: PlanEstudio): Observable<PlanEstudio> {
    return this.http.put<PlanEstudio>(`${this.baseEndpoint}/${planEstudio.id}`, planEstudio,
    {headers: this.cabeceras});
  }

  public eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseEndpoint}/${id}`, {headers: this.cabeceras})
    .pipe(map( resp => {
      console.log(resp);
      return true;
    }));
  }
}
