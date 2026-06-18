import { Routes } from '@angular/router';

export const MAPS_ROUTES: Routes = [
  { path: '', redirectTo: 'gmap', pathMatch: 'full' },
  { path: 'gmap', loadComponent: () => import('./google-maps/google-maps.component').then(m => m.GoogleMapsComponent) },
  { path: 'leaflet', loadComponent: () => import('./leaflet/leaflet.component').then(m => m.LeafletMapComponent) },
  { path: 'bubble', loadComponent: () => import('./bubble/bubble-map.component').then(m => m.BubbleMapComponent) },
  { path: 'line', loadComponent: () => import('./line/line-map.component').then(m => m.LineMapComponent) },
];
