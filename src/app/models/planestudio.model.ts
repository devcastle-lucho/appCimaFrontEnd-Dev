import { AnioLectivo } from './aniolectivo.model';
import { AreaAsignatura } from './areaasignatura.model';
import { Grado } from './Grado.model';

export interface PlanEstudio {
  id?:             number;
  fechaCreacion?:  string;
  horas?:          number;
  anioLectivo?:    AnioLectivo;
  grado?:          Grado;
  areaAsignatura?: AreaAsignatura;
}
