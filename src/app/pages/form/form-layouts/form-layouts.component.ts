import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-form-layouts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaPanelComponent],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent {
  horizontalForm: FormGroup;
  inlineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.horizontalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });

    this.inlineForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onHorizontalSubmit(): void {
    if (this.horizontalForm.valid) {
      console.log('Horizontal form submitted:', this.horizontalForm.value);
    }
  }

  onInlineSubmit(): void {
    if (this.inlineForm.valid) {
      console.log('Inline form submitted:', this.inlineForm.value);
    }
  }
}
