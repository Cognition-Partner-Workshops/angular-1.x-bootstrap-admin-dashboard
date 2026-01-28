import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../../../../shared/components/modal';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)" (keydown.escape)="close()" tabindex="-1" role="dialog" data-testid="basic-modal">
      <div class="modal-dialog" [class]="'modal-' + size" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" (click)="close()" aria-label="Close" data-testid="modal-close-btn">
              <em class="ion-ios-close-empty sn-link-close"></em>
            </button>
            <h4 class="modal-title">{{ title }}</h4>
          </div>
          <div class="modal-body">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="close()" data-testid="modal-save-btn">Save changes</button>
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

    .modal-md, .modal-medium {
      width: 600px;
    }

    .modal-lg, .modal-large {
      width: 900px;
    }

    .modal-content {
      border-radius: 5px;
      border: none;
      background-color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      position: relative;
    }

    .modal-title {
      margin: 0;
      font-size: 18px;
      color: #666;
    }

    .close {
      position: absolute;
      right: 15px;
      top: 15px;
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0.7;
    }

    .close:hover {
      opacity: 1;
    }

    .sn-link-close {
      color: #666;
      font-size: 30px;
    }

    .sn-link-close:hover {
      color: #e85656;
    }

    .modal-body {
      padding: 15px;
      color: #666;
    }

    .modal-footer {
      padding: 15px;
      border-top: 1px solid #e5e5e5;
      text-align: right;
    }

    .btn {
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background-color: #209e91;
      color: #fff;
    }

    .btn-primary:hover {
      background-color: #1a8a7e;
    }
  `]
})
export class BasicModalComponent {
  @Input() modalRef!: ModalRef;
  @Input() config: { title?: string; size?: string } = {};

  get title(): string {
    return this.config.title || 'Modal title';
  }

  get size(): string {
    const sizeMap: Record<string, string> = {
      'small': 'sm',
      'medium': 'md',
      'large': 'lg'
    };
    return sizeMap[this.config.size || 'medium'] || 'md';
  }

  close(): void {
    this.modalRef?.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
