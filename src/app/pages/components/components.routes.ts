import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: 'mail', pathMatch: 'full' },
  { path: 'mail', loadComponent: () => import('./mail/mail.component').then(m => m.MailComponent) },
  { path: 'timeline', loadComponent: () => import('./timeline/timeline.component').then(m => m.TimelineComponent) },
  { path: 'tree', loadComponent: () => import('./tree/tree.component').then(m => m.TreeComponent) },
];
