import { Routes } from '@angular/router';

export const INPUTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./inputs.component').then(m => m.InputsComponent),
    data: {
      breadcrumb: 'Inputs'
    }
  }
];
