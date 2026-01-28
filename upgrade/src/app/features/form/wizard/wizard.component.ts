import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface WizardStep {
  title: string;
  form?: NgForm;
  isComplete: () => boolean;
  isAvailable: () => boolean;
}

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent {
  currentStep = 0;
  steps: WizardStep[] = [];

  personalInfo = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  productInfo = {
    productName: '',
    productId: '',
    category: 'Electronics'
  };

  shipment = {
    address: '',
    shipmentMethod: 'Fast & expensive',
    saveShipmentInfo: false
  };

  personalInfoSubmitted = false;
  productInfoSubmitted = false;
  shipmentSubmitted = false;

  categories = ['Electronics', 'Toys', 'Accessories'];
  shipmentMethods = ['Fast & expensive', 'Cheap & free'];

  get progress(): number {
    return ((this.currentStep + 1) / 4) * 100;
  }

  arePersonalInfoPasswordsEqual(): boolean {
    return !!this.personalInfo.confirmPassword && 
           this.personalInfo.password === this.personalInfo.confirmPassword;
  }

  isPersonalInfoValid(): boolean {
    return !!this.personalInfo.username &&
           !!this.personalInfo.email &&
           this.isValidEmail(this.personalInfo.email) &&
           !!this.personalInfo.password &&
           this.arePersonalInfoPasswordsEqual();
  }

  isProductInfoValid(): boolean {
    return !!this.productInfo.productName && !!this.productInfo.productId;
  }

  isShipmentValid(): boolean {
    return !!this.shipment.address;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isStepAvailable(stepIndex: number): boolean {
    if (stepIndex === 0) return true;
    if (stepIndex === 1) return this.isPersonalInfoValid();
    if (stepIndex === 2) return this.isPersonalInfoValid() && this.isProductInfoValid();
    if (stepIndex === 3) return this.isPersonalInfoValid() && this.isProductInfoValid() && this.isShipmentValid();
    return false;
  }

  selectStep(stepIndex: number): void {
    this.submitCurrentStep();
    if (this.isStepAvailable(stepIndex)) {
      this.currentStep = stepIndex;
    }
  }

  submitCurrentStep(): void {
    if (this.currentStep === 0) {
      this.personalInfoSubmitted = true;
    } else if (this.currentStep === 1) {
      this.productInfoSubmitted = true;
    } else if (this.currentStep === 2) {
      this.shipmentSubmitted = true;
    }
  }

  nextStep(): void {
    if (!this.isLastStep()) {
      this.selectStep(this.currentStep + 1);
    }
  }

  previousStep(): void {
    if (!this.isFirstStep()) {
      this.selectStep(this.currentStep - 1);
    }
  }

  isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  isLastStep(): boolean {
    return this.currentStep === 3;
  }

  getStepTitles(): string[] {
    return ['Personal info', 'Product Info', 'Shipment', 'Finish'];
  }
}
