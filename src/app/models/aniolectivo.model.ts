export class AnioLectivo {
  constructor(public id: number,
    public descripcion: string,
    public fechaInicio: string,
    public fechaFin: string,
    public activo: boolean,
    public periodo: string,
    public periodoActual: string,
    public idNivelColegio: number,
    public tardanza: string,
    public admision: boolean,
    public periodoBoleta: number,
    public horaLlamada: string) {}
}
