import { Routes } from '@angular/router';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs.component').then(m => m.TabsComponent),
    data: {
      breadcrumb: 'Tabs & Accordions'
    }
  }
];
