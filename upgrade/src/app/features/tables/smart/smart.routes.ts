import { Routes } from '@angular/router';
import { SmartTableComponent } from './smart-table.component';

export const SMART_TABLE_ROUTES: Routes = [
  {
    path: '',
    component: SmartTableComponent,
    data: {
      breadcrumb: 'Smart Tables'
    }
  }
];
