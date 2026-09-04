import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <em class="ion-ios-close-empty sn-link-close"></em>
      </button>
      <h4 class="modal-title" id="myModalLabel">Add Account</h4>
    </div>
    <form>
      <div class="modal-body">
        <p>Paste a link to your profile into the box below</p>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Link to Profile" [(ngModel)]="link" name="link">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="ok()">Save changes</button>
      </div>
    </form>
  `,
})
export class ProfileModalComponent {
  link = '';

  constructor(public readonly activeModal: NgbActiveModal) {}

  ok(): void {
    this.activeModal.close(this.link);
  }
}
