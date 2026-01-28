import { Routes } from '@angular/router';

export const SLIDER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./slider.component').then(m => m.SliderComponent),
    data: {
      breadcrumb: 'Sliders'
    }
  }
];
