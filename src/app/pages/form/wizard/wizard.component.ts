import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-form-wizard',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './wizard.component.html',
})
export class FormWizardComponent {
  currentStep = 1;
}
