import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './mail.component.html',
})
export class MailComponent {}
