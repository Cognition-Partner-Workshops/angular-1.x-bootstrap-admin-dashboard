import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-form-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './form-wizard.component.html',
  styleUrl: './form-wizard.component.scss',
})
export class FormWizardComponent {
  currentStep = 1;
  totalSteps = 4;

  personalInfo = { firstName: '', lastName: '', email: '' };
  addressInfo = { address: '', city: '', state: '', zip: '' };
  accountInfo = { username: '', password: '', confirmPassword: '' };

  steps = ['Personal Info', 'Address', 'Account', 'Confirm'];

  nextStep(): void {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  submit(): void {
    console.log('Wizard submitted:', {
      personal: this.personalInfo,
      address: this.addressInfo,
      account: this.accountInfo,
    });
  }
}
