import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
})
export class InputsComponent {
  form: FormGroup;
  tags = signal<string[]>(['Amsterdam', 'Washington', 'Sydney']);
  newTag = '';
  switchValues = signal([true, false, true]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      textInput: [''],
      emailInput: [''],
      passwordInput: [''],
      disabledInput: [{ value: 'Disabled input', disabled: true }],
      textareaInput: [''],
      selectInput: ['1'],
      multipleSelect: [[]],
      dateInput: [''],
      checkbox1: [true],
      checkbox2: [false],
      checkbox3: [false],
      radio: ['option1'],
    });
  }

  addTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.tags.update(t => [...t, input.value.trim()]);
      input.value = '';
    }
  }

  removeTag(index: number): void {
    this.tags.update(t => t.filter((_, i) => i !== index));
  }

  toggleSwitch(index: number): void {
    this.switchValues.update(vals => vals.map((v, i) => i === index ? !v : v));
  }
}
