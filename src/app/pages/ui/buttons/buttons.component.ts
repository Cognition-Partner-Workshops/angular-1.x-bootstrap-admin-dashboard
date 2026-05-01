import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [BaPanelComponent],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  progressLoading = false;

  startProgress(): void {
    this.progressLoading = true;
    setTimeout(() => (this.progressLoading = false), 2000);
  }
}
