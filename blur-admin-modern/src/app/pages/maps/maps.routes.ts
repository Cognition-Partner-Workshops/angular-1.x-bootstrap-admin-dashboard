import { Routes } from '@angular/router';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { MapBubblesComponent } from './map-bubbles/map-bubbles.component';
import { MapLinesComponent } from './map-lines/map-lines.component';

export const MAPS_ROUTES: Routes = [
  { path: '', redirectTo: 'gmap', pathMatch: 'full' },
  { path: 'gmap', component: GoogleMapsComponent, data: { title: 'Google Maps', sidebarMeta: { order: 0 } } },
  { path: 'leaflet', component: LeafletComponent, data: { title: 'Leaflet Maps', sidebarMeta: { order: 100 } } },
  { path: 'bubble', component: MapBubblesComponent, data: { title: 'Bubble Maps', sidebarMeta: { order: 200 } } },
  { path: 'line', component: MapLinesComponent, data: { title: 'Line Maps', sidebarMeta: { order: 300 } } },
];
