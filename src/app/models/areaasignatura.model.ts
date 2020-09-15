import { AreaCurricular } from './areacurricular.model';
import { Asignatura } from './asignatura.model';

export interface AreaAsignatura {
  id?:             number;
  areaCurricular: AreaCurricular;
  asignatura:     Asignatura;
}
