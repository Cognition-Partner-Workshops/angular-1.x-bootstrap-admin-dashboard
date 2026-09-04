import { Routes } from '@angular/router';
import { TypographyComponent } from './typography/typography.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { GridComponent } from './grid/grid.component';

export const UI_ROUTES: Routes = [
  { path: '', redirectTo: 'typography', pathMatch: 'full' },
  { path: 'typography', component: TypographyComponent, data: { title: 'Typography', sidebarMeta: { order: 0 } } },
  { path: 'buttons', component: ButtonsComponent, data: { title: 'Buttons', sidebarMeta: { order: 100 } } },
  { path: 'icons', component: IconsComponent, data: { title: 'Icons', sidebarMeta: { order: 200 } } },
  { path: 'grid', component: GridComponent, data: { title: 'Grid', sidebarMeta: { order: 400 } } },
];
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
import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { SliderComponent } from './slider/slider.component';
import { PanelsComponent } from './panels/panels.component';

export const UI_ROUTES: Routes = [
  { path: 'tabs', component: TabsComponent, data: { title: 'Tabs & Accordions', sidebarMeta: { order: 800 } } },
  { path: 'slider', component: SliderComponent, data: { title: 'Sliders', sidebarMeta: { order: 1000 } } },
  { path: 'panels', component: PanelsComponent, data: { title: 'Panels', sidebarMeta: { order: 1100 } } },
];
