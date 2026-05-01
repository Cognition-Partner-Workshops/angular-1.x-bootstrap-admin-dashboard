import { Routes } from '@angular/router';
import { LayoutComponent } from './theme/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: { title: 'Dashboard' },
      },
      {
        path: 'ui',
        children: [
          { path: '', redirectTo: 'typography', pathMatch: 'full' },
          {
            path: 'typography',
            loadComponent: () => import('./pages/ui/typography/typography.component').then((m) => m.TypographyComponent),
            data: { title: 'Typography' },
          },
          {
            path: 'buttons',
            loadComponent: () => import('./pages/ui/buttons/buttons.component').then((m) => m.ButtonsComponent),
            data: { title: 'Buttons' },
          },
          {
            path: 'icons',
            loadComponent: () => import('./pages/ui/icons/icons.component').then((m) => m.IconsComponent),
            data: { title: 'Icons' },
          },
          {
            path: 'modals',
            loadComponent: () => import('./pages/ui/modals/modals.component').then((m) => m.ModalsComponent),
            data: { title: 'Modals' },
          },
          {
            path: 'grid',
            loadComponent: () => import('./pages/ui/grid/grid.component').then((m) => m.GridComponent),
            data: { title: 'Grid' },
          },
          {
            path: 'alerts',
            loadComponent: () => import('./pages/ui/alerts/alerts.component').then((m) => m.AlertsComponent),
            data: { title: 'Alerts' },
          },
          {
            path: 'progress-bars',
            loadComponent: () => import('./pages/ui/progress-bars/progress-bars.component').then((m) => m.ProgressBarsComponent),
            data: { title: 'Progress Bars' },
          },
          {
            path: 'notifications',
            loadComponent: () => import('./pages/ui/notifications/notifications.component').then((m) => m.NotificationsComponent),
            data: { title: 'Notifications' },
          },
          {
            path: 'tabs',
            loadComponent: () => import('./pages/ui/tabs/tabs.component').then((m) => m.TabsComponent),
            data: { title: 'Tabs' },
          },
          {
            path: 'slider',
            loadComponent: () => import('./pages/ui/slider/slider.component').then((m) => m.SliderComponent),
            data: { title: 'Slider' },
          },
          {
            path: 'panels',
            loadComponent: () => import('./pages/ui/panels/panels.component').then((m) => m.PanelsComponent),
            data: { title: 'Panels' },
          },
        ],
      },
      {
        path: 'form',
        children: [
          { path: '', redirectTo: 'inputs', pathMatch: 'full' },
          {
            path: 'inputs',
            loadComponent: () => import('./pages/form/inputs/inputs.component').then((m) => m.FormInputsComponent),
            data: { title: 'Form Inputs' },
          },
          {
            path: 'layouts',
            loadComponent: () => import('./pages/form/layouts/layouts.component').then((m) => m.FormLayoutsComponent),
            data: { title: 'Form Layouts' },
          },
          {
            path: 'wizard',
            loadComponent: () => import('./pages/form/wizard/wizard.component').then((m) => m.FormWizardComponent),
            data: { title: 'Form Wizard' },
          },
        ],
      },
      {
        path: 'tables',
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          {
            path: 'basic',
            loadComponent: () => import('./pages/tables/basic/basic-tables.component').then((m) => m.BasicTablesComponent),
            data: { title: 'Basic Tables' },
          },
          {
            path: 'smart',
            loadComponent: () => import('./pages/tables/smart/smart-tables.component').then((m) => m.SmartTablesComponent),
            data: { title: 'Smart Tables' },
          },
        ],
      },
      {
        path: 'charts',
        children: [
          { path: '', redirectTo: 'am-charts', pathMatch: 'full' },
          {
            path: 'am-charts',
            loadComponent: () => import('./pages/charts/am-charts/am-charts.component').then((m) => m.AmChartsComponent),
            data: { title: 'amCharts' },
          },
          {
            path: 'chart-js',
            loadComponent: () => import('./pages/charts/chart-js/chart-js.component').then((m) => m.ChartJsComponent),
            data: { title: 'Chart.js' },
          },
          {
            path: 'chartist',
            loadComponent: () => import('./pages/charts/chartist/chartist.component').then((m) => m.ChartistComponent),
            data: { title: 'Chartist' },
          },
          {
            path: 'morris',
            loadComponent: () => import('./pages/charts/morris/morris.component').then((m) => m.MorrisComponent),
            data: { title: 'Morris' },
          },
        ],
      },
      {
        path: 'maps',
        children: [
          { path: '', redirectTo: 'google-maps', pathMatch: 'full' },
          {
            path: 'google-maps',
            loadComponent: () => import('./pages/maps/google-maps/google-maps.component').then((m) => m.GoogleMapsComponent),
            data: { title: 'Google Maps' },
          },
          {
            path: 'leaflet',
            loadComponent: () => import('./pages/maps/leaflet/leaflet.component').then((m) => m.LeafletComponent),
            data: { title: 'Leaflet Maps' },
          },
          {
            path: 'map-bubbles',
            loadComponent: () => import('./pages/maps/map-bubbles/map-bubbles.component').then((m) => m.MapBubblesComponent),
            data: { title: 'Bubble Maps' },
          },
          {
            path: 'map-lines',
            loadComponent: () => import('./pages/maps/map-lines/map-lines.component').then((m) => m.MapLinesComponent),
            data: { title: 'Line Maps' },
          },
        ],
      },
      {
        path: 'components',
        children: [
          { path: '', redirectTo: 'mail', pathMatch: 'full' },
          {
            path: 'mail',
            loadComponent: () => import('./pages/components/mail/mail.component').then((m) => m.MailComponent),
            data: { title: 'Mail' },
          },
          {
            path: 'timeline',
            loadComponent: () => import('./pages/components/timeline/timeline.component').then((m) => m.TimelineComponent),
            data: { title: 'Timeline' },
          },
          {
            path: 'tree',
            loadComponent: () => import('./pages/components/tree/tree.component').then((m) => m.TreeComponent),
            data: { title: 'Tree View' },
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
        data: { title: 'Profile' },
      },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login.component').then((m) => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/auth/register.component').then((m) => m.RegisterComponent) },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
