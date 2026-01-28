import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FormFieldState = 'default' | 'valid' | 'invalid' | 'disabled';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() state: FormFieldState = 'default';
  @Input() fieldId = '';
}
