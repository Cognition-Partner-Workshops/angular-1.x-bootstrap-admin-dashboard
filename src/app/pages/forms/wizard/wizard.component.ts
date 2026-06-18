import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  currentStep = signal(1);
  totalSteps = 4;

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.step2Form = this.fb.group({
      company: [''],
      position: [''],
      phone: [''],
    });
    this.step3Form = this.fb.group({
      address: [''],
      city: [''],
      country: [''],
      zipCode: [''],
    });
  }

  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  goToStep(step: number): void {
    this.currentStep.set(step);
  }

  submit(): void {
    this.currentStep.set(this.totalSteps);
  }
}
