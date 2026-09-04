import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BaPanelComponent } from '../../../theme';
import { MailTabService } from './mail-tab.service';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, BaPanelComponent],
  templateUrl: './mail.component.html',
})
export class MailComponent {
  readonly tab = inject(MailTabService);
}
