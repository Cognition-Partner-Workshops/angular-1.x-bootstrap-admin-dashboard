import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Modal title</h4>
      <button type="button" class="close" (click)="activeModal.dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button>
    </div>
    <div class="modal-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div>
    <div class="modal-footer"><button type="button" class="btn btn-primary" (click)="activeModal.dismiss()">Save changes</button></div>
  `,
})
export class BasicModalComponent {
  constructor(public readonly activeModal: NgbActiveModal) {}
}
