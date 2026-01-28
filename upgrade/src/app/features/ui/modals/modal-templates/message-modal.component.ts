import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../../../../shared/components/modal';

export type MessageType = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)" (keydown.escape)="close()" tabindex="-1" role="dialog" data-testid="message-modal">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content message-modal">
          <div class="modal-header" [class]="'bg-' + type" [attr.data-testid]="'message-modal-header-' + type">
            <i [class]="icon + ' modal-icon'"></i><span> {{ title }}</span>
          </div>
          <div class="modal-body text-center">{{ message }}</div>
          <div class="modal-footer">
            <button 
              type="button" 
              [class]="'btn btn-' + type" 
              (click)="close()"
              data-testid="message-modal-ok-btn">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      text-align: center;
    }

    .modal-dialog {
      display: inline-block;
      text-align: left;
      margin: 0 auto;
    }

    .modal-sm {
      width: 300px;
    }

    .modal-content {
      border-radius: 5px;
      border: none;
      background-color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .message-modal .modal-header {
      text-align: center;
      padding: 15px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #fff;
    }

    .message-modal .modal-header i {
      font-size: 32px;
    }

    .modal-icon {
      margin-right: 3px;
    }

    .modal-body {
      padding: 15px;
      color: #666;
    }

    .text-center {
      text-align: center;
    }

    .modal-footer {
      padding: 15px;
      text-align: center;
      border-top: none;
    }

    .bg-success {
      background-color: #90b900;
    }

    .bg-info {
      background-color: #2dacd1;
    }

    .bg-warning {
      background-color: #dfb81c;
    }

    .bg-danger {
      background-color: #e85656;
    }

    .btn {
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      color: #fff;
      min-width: 80px;
    }

    .btn-success {
      background-color: #90b900;
    }

    .btn-success:hover {
      background-color: #7da300;
    }

    .btn-info {
      background-color: #2dacd1;
    }

    .btn-info:hover {
      background-color: #2697b8;
    }

    .btn-warning {
      background-color: #dfb81c;
    }

    .btn-warning:hover {
      background-color: #c9a619;
    }

    .btn-danger {
      background-color: #e85656;
    }

    .btn-danger:hover {
      background-color: #d44545;
    }
  `]
})
export class MessageModalComponent {
  @Input() modalRef!: ModalRef;
  @Input() type: MessageType = 'success';
  @Input() title = '';
  @Input() message = '';
  @Input() icon = '';

  close(): void {
    this.modalRef?.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
