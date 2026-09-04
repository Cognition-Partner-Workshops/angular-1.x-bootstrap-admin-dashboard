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
