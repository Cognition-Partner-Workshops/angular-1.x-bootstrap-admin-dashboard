import { Component, ViewEncapsulation } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BaPanelComponent } from '../../../theme';
import { ProgressButtonComponent } from './progress-button/progress-button.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [BaPanelComponent, NgbDropdownModule, ProgressButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
  readonly progressFunction = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 3000));
}
