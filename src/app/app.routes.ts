import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    data: { title: 'Dashboard' },
  },
  {
    path: 'ui',
    children: [
      {
        path: 'typography',
        loadComponent: () =>
          import('./pages/ui/typography/typography.component').then(
            (m) => m.TypographyComponent
          ),
        data: { title: 'Typography' },
      },
      {
        path: 'buttons',
        loadComponent: () =>
          import('./pages/ui/buttons/buttons.component').then(
            (m) => m.ButtonsComponent
          ),
        data: { title: 'Buttons' },
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./pages/ui/icons/icons.component').then(
            (m) => m.IconsComponent
          ),
        data: { title: 'Icons' },
      },
      {
        path: 'modals',
        loadComponent: () =>
          import('./pages/ui/modals/modals.component').then(
            (m) => m.ModalsComponent
          ),
        data: { title: 'Modals' },
      },
      {
        path: 'grid',
        loadComponent: () =>
          import('./pages/ui/grid/grid.component').then(
            (m) => m.GridComponent
          ),
        data: { title: 'Grid' },
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('./pages/ui/alerts/alerts.component').then(
            (m) => m.AlertsComponent
          ),
        data: { title: 'Alerts' },
      },
      {
        path: 'progress-bars',
        loadComponent: () =>
          import('./pages/ui/progress-bars/progress-bars.component').then(
            (m) => m.ProgressBarsComponent
          ),
        data: { title: 'Progress Bars' },
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/ui/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
        data: { title: 'Notifications' },
      },
      {
        path: 'tabs',
        loadComponent: () =>
          import('./pages/ui/tabs-accordions/tabs-accordions.component').then(
            (m) => m.TabsAccordionsComponent
          ),
        data: { title: 'Tabs & Accordions' },
      },
      {
        path: 'slider',
        loadComponent: () =>
          import('./pages/ui/slider/slider.component').then(
            (m) => m.SliderComponent
          ),
        data: { title: 'Slider' },
      },
      {
        path: 'panels',
        loadComponent: () =>
          import('./pages/ui/panels/panels.component').then(
            (m) => m.PanelsComponent
          ),
        data: { title: 'Panels' },
      },
      { path: '', redirectTo: 'typography', pathMatch: 'full' },
    ],
  },
  {
    path: 'components',
    children: [
      {
        path: 'timeline',
        loadComponent: () =>
          import('./pages/components/timeline/timeline.component').then(
            (m) => m.TimelineComponent
          ),
        data: { title: 'Timeline' },
      },
      {
        path: 'mail',
        loadComponent: () =>
          import('./pages/components/mail/mail.component').then(
            (m) => m.MailComponent
          ),
        data: { title: 'Mail' },
      },
      {
        path: 'tree',
        loadComponent: () =>
          import('./pages/components/tree/tree.component').then(
            (m) => m.TreeComponent
          ),
        data: { title: 'Tree View' },
      },
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
    ],
  },
  {
    path: 'charts',
    children: [
      {
        path: 'chartjs',
        loadComponent: () =>
          import('./pages/charts/chartjs/chartjs.component').then(
            (m) => m.ChartjsComponent
          ),
        data: { title: 'Chart.js' },
      },
      { path: '', redirectTo: 'chartjs', pathMatch: 'full' },
    ],
  },
  {
    path: 'maps',
    children: [
      {
        path: 'google',
        loadComponent: () =>
          import('./pages/maps/google-maps/google-maps.component').then(
            (m) => m.GoogleMapsComponent
          ),
        data: { title: 'Google Maps' },
      },
      {
        path: 'leaflet',
        loadComponent: () =>
          import('./pages/maps/leaflet/leaflet.component').then(
            (m) => m.LeafletComponent
          ),
        data: { title: 'Leaflet Maps' },
      },
      { path: '', redirectTo: 'google', pathMatch: 'full' },
    ],
  },
  {
    path: 'tables',
    children: [
      {
        path: 'basic',
        loadComponent: () =>
          import('./pages/tables/basic-tables/basic-tables.component').then(
            (m) => m.BasicTablesComponent
          ),
        data: { title: 'Basic Tables' },
      },
      {
        path: 'smart',
        loadComponent: () =>
          import('./pages/tables/smart-table/smart-table.component').then(
            (m) => m.SmartTableComponent
          ),
        data: { title: 'Smart Table' },
      },
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
    ],
  },
  {
    path: 'form',
    children: [
      {
        path: 'inputs',
        loadComponent: () =>
          import('./pages/form/form-inputs/form-inputs.component').then(
            (m) => m.FormInputsComponent
          ),
        data: { title: 'Form Inputs' },
      },
      {
        path: 'layouts',
        loadComponent: () =>
          import('./pages/form/form-layouts/form-layouts.component').then(
            (m) => m.FormLayoutsComponent
          ),
        data: { title: 'Form Layouts' },
      },
      {
        path: 'wizard',
        loadComponent: () =>
          import('./pages/form/form-wizard/form-wizard.component').then(
            (m) => m.FormWizardComponent
          ),
        data: { title: 'Form Wizard' },
      },
      { path: '', redirectTo: 'inputs', pathMatch: 'full' },
    ],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    data: { title: 'User Profile' },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
