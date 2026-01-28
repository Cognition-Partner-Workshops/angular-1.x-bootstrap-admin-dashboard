import { Routes } from '@angular/router';

export const MODALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./modals.component').then(m => m.ModalsComponent),
    data: {
      breadcrumb: 'Modals'
    }
  }
];
