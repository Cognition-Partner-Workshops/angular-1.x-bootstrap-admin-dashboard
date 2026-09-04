import { Routes } from '@angular/router';
import { BasicTablesComponent } from './basic-tables.component';
import { SmartTablesComponent } from './smart-tables.component';

export const TABLES_ROUTES: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  { path: 'basic', component: BasicTablesComponent, data: { title: 'Basic Tables', sidebarMeta: { order: 0 } } },
  { path: 'smart', component: SmartTablesComponent, data: { title: 'Smart Tables', sidebarMeta: { order: 100 } } },
];
