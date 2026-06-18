import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent {
  basicForm: FormGroup;
  horizontalForm: FormGroup;
  inlineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.horizontalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
    this.inlineForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }
}
