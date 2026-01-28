import { Routes } from '@angular/router';

export const MAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./mail.component').then(m => m.MailComponent),
    data: {
      breadcrumb: 'Mail'
    },
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full'
      },
      {
        path: ':label',
        loadComponent: () => import('./mail-list.component').then(m => m.MailListComponent),
        data: {
          breadcrumb: 'List'
        }
      },
      {
        path: ':label/:id',
        loadComponent: () => import('./mail-detail.component').then(m => m.MailDetailComponent),
        data: {
          breadcrumb: 'Detail'
        }
      }
    ]
  }
];
