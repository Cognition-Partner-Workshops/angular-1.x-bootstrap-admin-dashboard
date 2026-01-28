import { Routes } from '@angular/router';

export const TYPOGRAPHY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./typography.component').then(m => m.TypographyComponent),
    data: {
      breadcrumb: 'Typography'
    }
  }
];
