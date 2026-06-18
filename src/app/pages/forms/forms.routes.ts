import { Routes } from '@angular/router';

export const FORMS_ROUTES: Routes = [
  { path: '', redirectTo: 'inputs', pathMatch: 'full' },
  { path: 'inputs', loadComponent: () => import('./inputs/inputs.component').then(m => m.InputsComponent) },
  { path: 'layouts', loadComponent: () => import('./layouts/layouts.component').then(m => m.LayoutsComponent) },
  { path: 'wizard', loadComponent: () => import('./wizard/wizard.component').then(m => m.WizardComponent) },
];
