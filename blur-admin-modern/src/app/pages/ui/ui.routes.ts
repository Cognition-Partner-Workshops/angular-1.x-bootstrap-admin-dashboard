import { Routes } from '@angular/router';
import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const UI_ROUTES: Routes = [
  { path: '', redirectTo: 'typography', pathMatch: 'full' },
  { path: 'modals', component: ModalsComponent, data: { title: 'Modals', sidebarMeta: { order: 300 } } },
  { path: 'alerts', component: AlertsComponent, data: { title: 'Alerts', sidebarMeta: { order: 500 } } },
  { path: 'progressBars', component: ProgressBarsComponent, data: { title: 'Progress Bars', sidebarMeta: { order: 600 } } },
  { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications', sidebarMeta: { order: 700 } } },
];
