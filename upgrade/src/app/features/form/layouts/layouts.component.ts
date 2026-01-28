import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  inlineFormData = {
    name: '',
    email: '',
    rememberMe: false
  };

  basicFormData = {
    email: '',
    password: '',
    checkMe: false
  };

  horizontalFormData = {
    email: '',
    password: '',
    rememberMe: false
  };

  formWithoutLabelsData = {
    recipients: '',
    subject: '',
    message: ''
  };

  blockFormData = {
    firstName: '',
    lastName: '',
    email: '',
    website: ''
  };

  onInlineFormSubmit(): void {
    console.log('Inline form submitted:', this.inlineFormData);
  }

  onBasicFormSubmit(): void {
    console.log('Basic form submitted:', this.basicFormData);
  }

  onHorizontalFormSubmit(): void {
    console.log('Horizontal form submitted:', this.horizontalFormData);
  }

  onFormWithoutLabelsSubmit(): void {
    console.log('Form without labels submitted:', this.formWithoutLabelsData);
  }

  onBlockFormSubmit(): void {
    console.log('Block form submitted:', this.blockFormData);
  }
}
