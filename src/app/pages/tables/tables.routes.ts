import { Routes } from '@angular/router';

export const TABLES_ROUTES: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  { path: 'basic', loadComponent: () => import('./basic/basic-tables.component').then(m => m.BasicTablesComponent) },
  { path: 'smart', loadComponent: () => import('./smart/smart-table.component').then(m => m.SmartTableComponent) },
];
