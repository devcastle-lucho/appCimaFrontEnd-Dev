import { AreaAsignatura } from './../../models/areaasignatura.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AreaAsignaturaService } from './../../services/area-asignatura.service';
import { AreaAsignaturaVista } from './../../models/dto/areaasignatura.model';
import { Observable } from 'rxjs';
import { PlanEstudio } from './../../models/planestudio.model';
import { PlanEstudioService } from './../../services/plan-estudio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-guardar',
  templateUrl: './modal-guardar.component.html',
  styleUrls: ['./modal-guardar.component.css']
})
export class ModalGuardarComponent implements OnInit {
  areasAsignatura$?: Observable<AreaAsignaturaVista[]>;
  selectedAreaAsignaturaId?: number;
  formPE?: FormGroup;
  @Input()
  public planEstudio: PlanEstudio = {};
  @Input()
  public tipo?: string;

  constructor(public activeModal: NgbActiveModal,
              private areaAsignaturaService: AreaAsignaturaService,
              private planEstudioService: PlanEstudioService,
              private fb: FormBuilder) {

    this.crearFormulario();
  }

  ngOnInit(): void {
    console.log(this.planEstudio);
    this.areasAsignatura$ = this.areaAsignaturaService.listarPersonalizada();
    /*this.areaAsignaturaService.listarPersonalizada().subscribe((data: any) => {
      console.log(data);
    });*/
    if (this.tipo !== 'NUEVO') {
      this.cargarDataFormulario();
    }
  }

  crearFormulario(): void {
    this.formPE = this.fb.group({
      horas : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      areaasignatura: ['', Validators.required]
    });
  }
  cargarDataFormulario(): void {
    this.formPE?.reset({
      areaasignatura: this.planEstudio.areaAsignatura?.id,
      horas: this.planEstudio.horas
    });
  }
  get f() {
    return this.formPE?.controls;
  }
  get horasNoValido() {
    return this.formPE?.get('horas')?.invalid && this.formPE?.get('horas')?.touched;
  }
  get areaCurricularNoValido() {
    return this.formPE?.get('areaasignatura')?.invalid && this.formPE?.get('areaasignatura')?.touched;
  }
  guardar(): void {
    console.log(this.formPE);
    if (this.formPE?.invalid) {
      console.log('No valido');
      Object.values(this.formPE.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control2 => control2.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }
    if (this.tipo === 'NUEVO') {
      this.crear();
    } else {
      this.editar();
    }
  }
  private crear(): void {
    this.obtenerDatos();
    this.planEstudioService.crear(this.planEstudio).subscribe((data: PlanEstudio) => {
      Swal.fire(
        'Confirmación',
         '¡plan de estudio se ha creado correctamente!',
        'success'
      );
      this.activeModal.close('OK');
    });
  }
  private editar(): void {
    this.obtenerDatos();
    this.planEstudioService.editar(this.planEstudio).subscribe((data: PlanEstudio) => {
      Swal.fire(
        'Confirmación',
         '¡plan de estudio se ha editado correctamente!',
        'success'
      );
      this.activeModal.close('OK');
    });
  }
  private obtenerDatos(): void {
    const horas = this.formPE?.value.horas;
    const areaasignatura = this.formPE?.value.areaasignatura;
    this.planEstudio.areaAsignatura =  <AreaAsignatura>{  id: areaasignatura } ; // casteo explicito
    this.planEstudio.horas = horas as number;
  }
}
