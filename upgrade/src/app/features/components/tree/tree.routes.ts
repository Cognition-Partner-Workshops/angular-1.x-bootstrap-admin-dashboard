import { Routes } from '@angular/router';

export const TREE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./tree.component').then(m => m.TreeComponent),
    data: {
      breadcrumb: 'Tree View'
    }
  }
];
