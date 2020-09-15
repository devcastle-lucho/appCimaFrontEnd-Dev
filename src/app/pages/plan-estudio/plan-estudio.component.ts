import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AnioLectivo } from './../../models/aniolectivo.model';
import { AnioLectivoService } from './../../services/anio-lectivo.service';
import { Grado } from './../../models/grado.model';
import { GradoService } from './../../services/grado.service';
import { ModalGuardarComponent } from './modal-guardar.component';
import { PlanEstudio } from './../../models/planestudio.model';
import { PlanEstudioService } from './../../services/plan-estudio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-estudio',
  templateUrl: './plan-estudio.component.html',
  styleUrls: ['./plan-estudio.component.css']
})
export class PlanEstudioComponent implements OnInit {
  lista: PlanEstudio[] = [];
  lAnioLectivo: AnioLectivo[] = [];
  lGrado: Grado[] = [];
  selectedAnioLectivo?: AnioLectivo;
  selectedIdGrado = 0;
  planEstudioActual?: PlanEstudio ;
  cargando = false;

  constructor(public planEstudioService: PlanEstudioService,
              public anioLectivoService: AnioLectivoService,
              public gradoService: GradoService,
              private modalService: NgbModal
              ) {
  }
  ngOnInit(): void {
    this.cargarAnioLectivo();
  }


  public open(): void {
    const validacion = this.verificarNuevo();
    if ( validacion !== '') {
      Swal.fire({
        title: 'Mensaje',
        text: validacion,
        icon: 'warning'
      });
      return;
    }

    this.planEstudioActual = {
      anioLectivo : this.selectedAnioLectivo,
      grado: { id: this.selectedIdGrado }
    };
    this.mostrarModal('NUEVO');
  }
  public mostrarModal(tipo: string) {
    const modalRef = this.modalService.open(ModalGuardarComponent, { size: 'lg' });
    modalRef.componentInstance.planEstudio = this.planEstudioActual;
    modalRef.componentInstance.tipo = tipo;
    modalRef.result.then((result) => {
      if (result === 'OK') {
        this.listar();
      }
    });
  }
  public verificarNuevo(): string {
    let mensaje = '';
    if (!this.selectedAnioLectivo?.id) {
      mensaje = 'Seleccione año lectivo';
    } else if (!this.selectedIdGrado  || this.selectedIdGrado === 0) {
      mensaje = 'Seleccione grado';
    }
    return mensaje;
  }

  public eliminar(id: number): void {
    Swal.fire({
      title: 'Confirmacion',
      text: '¿Está seguro de eliminar un plan de estudio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((borrar) => {
      if (borrar.value) {
        this.planEstudioService.eliminar(id)
        .subscribe( resp => {
          Swal.fire(
            'Mensaje',
            'El plan de estudio fue eliminado correctamente.',
            'success'
          );
          this.listar();
        });
      }
    });
  }
  public editar(planEstudio: PlanEstudio) {
    this.planEstudioActual = planEstudio;
    this.mostrarModal('EDICION');
  }
  public listar(): void {
    const idAnioLectivo: number = this.selectedAnioLectivo?.id ?? 0;

    if (idAnioLectivo !== 0 && this.selectedIdGrado !== 0) {
      this.cargando = true;
      this.planEstudioService.listarPaginacion(idAnioLectivo, this.selectedIdGrado).subscribe(
        (data: any) => {
          const listaP: PlanEstudio[] = data.content;
          console.log(listaP);
          this.lista = listaP;
          this.cargando = false;
        },  (error: any) => {
          this.cargando = false;
        });
    } else {
        this.lista = [];
    }
  }

  private cargarAnioLectivo(): void {
    this.anioLectivoService.listarActivos().subscribe(
      (data: AnioLectivo[]) => {
        console.log(data);
        this.lAnioLectivo = data;
      }
    );
  }

  private cargarGrado(idNivelColegio: number): void {
    this.gradoService.listarNivelColegio(idNivelColegio).subscribe(
      (data: Grado[]) => {
        console.log(data);
        this.lGrado = data;
      }
    );
  }

  public cambioAnioLectivo(): void {
    const idNivelColegio = this.selectedAnioLectivo?.idNivelColegio ?? 0;
    this.cargarGrado(idNivelColegio);
    this.listar();
  }
}
