import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent, BaWizardComponent, BaWizardStepComponent } from '../../../theme';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [FormsModule, BaPanelComponent, BaWizardComponent, BaWizardStepComponent],
  templateUrl: './wizard.component.html',
})
export class WizardComponent {
  personalInfo = { username: '', email: '', password: '', confirmPassword: '' };
  productInfo = { productName: '', productId: '', category: 'Electronics' };
  shipment = { address: '', method: 'Fast & expensive', save: false };

  arePersonalInfoPasswordsEqual(): boolean {
    return !!this.personalInfo.confirmPassword && this.personalInfo.password === this.personalInfo.confirmPassword;
  }
}
