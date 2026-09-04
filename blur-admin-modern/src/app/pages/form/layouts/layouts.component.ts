import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { InlineFormComponent } from './widgets/inline-form/inline-form.component';
import { BasicFormComponent } from './widgets/basic-form/basic-form.component';
import { HorizontalFormComponent } from './widgets/horizontal-form/horizontal-form.component';
import { FormWithoutLabelsComponent } from './widgets/form-without-labels/form-without-labels.component';
import { BlockFormComponent } from './widgets/block-form/block-form.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [BaPanelComponent, InlineFormComponent, BasicFormComponent, HorizontalFormComponent, FormWithoutLabelsComponent, BlockFormComponent],
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent {}
