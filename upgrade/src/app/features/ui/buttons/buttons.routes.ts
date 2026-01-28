import { Routes } from '@angular/router';

export const BUTTONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./buttons.component').then(m => m.ButtonsComponent),
    data: {
      breadcrumb: 'Buttons'
    }
  }
];
