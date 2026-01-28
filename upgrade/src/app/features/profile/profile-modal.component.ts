import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { ModalRef } from '../../shared/components/modal/modal.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <app-modal 
      title="Add Account" 
      [closable]="true" 
      [showFooter]="true"
      (closeModal)="dismiss()">
      <form name="linkForm">
        <div class="modal-body-content">
          <p>Paste a link to your profile into the box below</p>
          <div class="form-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Link to Profile" 
              [(ngModel)]="link"
              name="link"
              data-testid="profile-link-input">
          </div>
        </div>
      </form>
      <div modalFooter>
        <button type="button" class="btn btn-primary" (click)="save()" data-testid="save-link-btn">Save changes</button>
      </div>
    </app-modal>
  `,
  styles: [`
    .modal-body-content {
      padding: 15px 0;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-control {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    
    .form-control:focus {
      border-color: #209e91;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(32, 158, 145, 0.6);
    }
    
    .btn {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
    }
    
    .btn-primary {
      color: #fff;
      background-color: #209e91;
      border-color: #1a8a7e;
    }
    
    .btn-primary:hover {
      background-color: #1a8a7e;
      border-color: #157a6f;
    }
    
    p {
      margin-bottom: 15px;
      color: #666;
    }
  `]
})
export class ProfileModalComponent {
  link = '';
  modalRef!: ModalRef<string>;

  save(): void {
    this.modalRef.close(this.link);
  }

  dismiss(): void {
    this.modalRef.close(undefined);
  }
}
