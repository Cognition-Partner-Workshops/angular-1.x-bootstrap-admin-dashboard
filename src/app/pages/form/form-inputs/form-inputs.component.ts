import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-form-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  textInput = '';
  emailInput = '';
  passwordInput = '';
  textareaInput = '';
  selectValue = '';
  checkboxValue = false;
  radioValue = 'option1';
  dateValue = '';
  switchValue = false;
}
