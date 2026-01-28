import { Routes } from '@angular/router';

export const LEAFLET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./leaflet.component').then(m => m.LeafletComponent),
    data: {
      breadcrumb: 'Leaflet Maps'
    }
  }
];
