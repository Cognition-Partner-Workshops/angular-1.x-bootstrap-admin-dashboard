import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess(): void { this.toastr.success('You are awesome!', 'Success'); }
  showInfo(): void { this.toastr.info('Just some information for you.', 'Info'); }
  showWarning(): void { this.toastr.warning('Be careful!', 'Warning'); }
  showError(): void { this.toastr.error('Something went wrong!', 'Error'); }
}
