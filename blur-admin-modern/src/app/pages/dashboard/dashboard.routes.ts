import { Routes } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [{
  path: '',
  component: DashboardComponent,
  providers: [provideCharts(withDefaultRegisterables())],
  data: { title: 'Dashboard', sidebarMeta: { icon: 'ion-android-home', order: 0 } },
}];
