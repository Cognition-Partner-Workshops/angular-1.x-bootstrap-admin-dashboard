import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComposeBoxComponent } from './compose-box.component';

export interface ComposeOptions {
  subject: string;
  to: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ComposeModalService {
  constructor(private readonly modal: NgbModal) {}

  open(options: ComposeOptions): NgbModalRef {
    const ref = this.modal.open(ComposeBoxComponent, { animation: false, size: 'compose' });
    ref.componentInstance.subject = options.subject;
    ref.componentInstance.to = options.to;
    ref.componentInstance.text = options.text;
    return ref;
  }
}
