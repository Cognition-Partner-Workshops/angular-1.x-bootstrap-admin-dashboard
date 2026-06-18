import { Routes } from '@angular/router';

export const UI_ROUTES: Routes = [
  { path: '', redirectTo: 'typography', pathMatch: 'full' },
  { path: 'typography', loadComponent: () => import('./typography/typography.component').then(m => m.TypographyComponent) },
  { path: 'buttons', loadComponent: () => import('./buttons/buttons.component').then(m => m.ButtonsComponent) },
  { path: 'icons', loadComponent: () => import('./icons/icons.component').then(m => m.IconsComponent) },
  { path: 'modals', loadComponent: () => import('./modals/modals.component').then(m => m.ModalsComponent) },
  { path: 'alerts', loadComponent: () => import('./alerts/alerts.component').then(m => m.AlertsComponent) },
  { path: 'progressBars', loadComponent: () => import('./progress-bars/progress-bars.component').then(m => m.ProgressBarsComponent) },
  { path: 'notifications', loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent) },
  { path: 'grid', loadComponent: () => import('./grid/grid.component').then(m => m.GridComponent) },
  { path: 'panels', loadComponent: () => import('./panels/panels.component').then(m => m.PanelsComponent) },
  { path: 'slider', loadComponent: () => import('./slider/slider.component').then(m => m.SliderComponent) },
  { path: 'tabs', loadComponent: () => import('./tabs/tabs.component').then(m => m.TabsComponent) },
];
