import { Routes } from '@angular/router';

export const LAYOUTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts.component').then(m => m.LayoutsComponent),
    data: {
      breadcrumb: 'Layouts'
    }
  }
];
