import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export type MessageModalKind = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="modal-header" [ngClass]="'bg-' + kind"><i class="modal-icon" [ngClass]="icon"></i><span> {{ heading }}</span></div>
    <div class="modal-body text-center">{{ message }}</div>
    <div class="modal-footer"><button type="button" [ngClass]="'btn btn-' + kind" (click)="activeModal.dismiss()">OK</button></div>
  `,
})
export class MessageModalComponent {
  kind: MessageModalKind = 'success';
  icon = '';
  heading = '';
  message = '';

  constructor(public readonly activeModal: NgbActiveModal) {}
}
