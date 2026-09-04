import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications-widget',
  standalone: true,
  template: `
    <div class="modal-buttons same-width clearfix">
      <button type="button" class="btn btn-success" (click)="showSuccessMsg()">Success Notification</button>
      <button type="button" class="btn btn-info" (click)="showInfoMsg()">Info Notification</button>
      <button type="button" class="btn btn-warning" (click)="showWarningMsg()">Warning Notification</button>
      <button type="button" class="btn btn-danger" (click)="showErrorMsg()">Danger Notification</button>
    </div>
  `,
})
export class NotificationsWidgetComponent {
  private readonly toastr = inject(ToastrService);

  showSuccessMsg(): void {
    this.toastr.success('Your information has been saved successfully!');
  }

  showInfoMsg(): void {
    this.toastr.info("You've got a new email!", 'Information');
  }

  showErrorMsg(): void {
    this.toastr.error("Your information hasn't been saved!", 'Error');
  }

  showWarningMsg(): void {
    this.toastr.warning('Your computer is about to explode!', 'Warning');
  }
}
