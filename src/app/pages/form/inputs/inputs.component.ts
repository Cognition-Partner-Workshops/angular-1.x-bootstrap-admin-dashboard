import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-form-inputs',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './inputs.component.html',
})
export class FormInputsComponent {}
