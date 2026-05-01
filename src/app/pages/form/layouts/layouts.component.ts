import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-form-layouts',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './layouts.component.html',
})
export class FormLayoutsComponent {}
