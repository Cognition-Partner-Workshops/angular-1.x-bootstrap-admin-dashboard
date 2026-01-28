import { Routes } from '@angular/router';

export const GOOGLE_MAPS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./google-maps.component').then(m => m.GoogleMapsComponent),
    data: {
      breadcrumb: 'Google Maps'
    }
  }
];
