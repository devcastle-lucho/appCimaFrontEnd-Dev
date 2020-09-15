import { RouterModule, Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageModule } from './pages/page.module';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
              path: 'pages',
              loadChildren: () => import('./pages/page.module').then(m => m.PageModule)
            },
            {
                path: 'component',
                loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
