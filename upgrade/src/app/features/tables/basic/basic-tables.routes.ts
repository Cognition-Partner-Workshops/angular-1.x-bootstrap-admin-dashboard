import { Routes } from '@angular/router';

export const BASIC_TABLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./basic-tables.component').then(m => m.BasicTablesComponent),
    data: {
      breadcrumb: 'Basic Tables'
    }
  }
];
