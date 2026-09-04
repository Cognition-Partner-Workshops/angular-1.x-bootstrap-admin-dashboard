import { Routes } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { WizardComponent } from './wizard/wizard.component';

export const FORM_ROUTES: Routes = [
  { path: '', redirectTo: 'inputs', pathMatch: 'full' },
  { path: 'inputs', component: InputsComponent, data: { title: 'Form Inputs', sidebarMeta: { order: 0 } } },
  { path: 'layouts', component: LayoutsComponent, data: { title: 'Form Layouts', sidebarMeta: { order: 100 } } },
  { path: 'wizard', component: WizardComponent, data: { title: 'Form Wizard', sidebarMeta: { order: 200 } } },
];
