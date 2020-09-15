import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ModalGuardarComponent } from './plan-estudio/modal-guardar.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanEstudioComponent } from './plan-estudio/plan-estudio.component';

const routes: Routes = [
  {
    path: 'plan-estudio',
      data: {
          title: 'Plan Estudio',
          urls: [
              // { title: 'Dashboard', url: '/dashboard' },
              { title: 'Plan Estudio' }
          ]
      },
      component: PlanEstudioComponent
  }
];
@NgModule({
  declarations: [PlanEstudioComponent, ModalGuardarComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class PageModule { }
