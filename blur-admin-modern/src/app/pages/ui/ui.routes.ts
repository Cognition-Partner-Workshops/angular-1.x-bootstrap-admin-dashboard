import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { SliderComponent } from './slider/slider.component';
import { PanelsComponent } from './panels/panels.component';

export const UI_ROUTES: Routes = [
  { path: 'tabs', component: TabsComponent, data: { title: 'Tabs & Accordions', sidebarMeta: { order: 800 } } },
  { path: 'slider', component: SliderComponent, data: { title: 'Sliders', sidebarMeta: { order: 1000 } } },
  { path: 'panels', component: PanelsComponent, data: { title: 'Panels', sidebarMeta: { order: 1100 } } },
];
