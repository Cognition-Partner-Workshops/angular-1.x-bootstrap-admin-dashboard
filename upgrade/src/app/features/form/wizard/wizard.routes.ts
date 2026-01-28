import { Routes } from '@angular/router';

export const WIZARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./wizard.component').then(m => m.WizardComponent),
    data: {
      breadcrumb: 'Wizard'
    }
  }
];
