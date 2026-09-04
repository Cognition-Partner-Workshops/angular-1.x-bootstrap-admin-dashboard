import { Injectable, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgressModalComponent } from '../components/progress-modal/progress-modal.component';

@Injectable({ providedIn: 'root' })
export class BaProgressModalService {
  readonly progress = signal(0);
  private active = false;
  private ref?: { close(): void };

  constructor(private readonly modal: NgbModal) {}

  setProgress(value: number): void {
    if (value > 100) throw new Error("Progress can't be greater than max");
    this.progress.set(value);
  }

  getProgress(): number {
    return this.progress();
  }

  open(): void {
    if (this.active) throw new Error('Progress modal opened now');
    this.ref = this.modal.open(ProgressModalComponent, {
      animation: true,
      size: 'sm',
      keyboard: false,
      backdrop: 'static',
    });
    this.active = true;
  }

  close(): void {
    if (!this.active) throw new Error('Progress modal is not active');
    this.ref?.close();
    this.ref = undefined;
    this.active = false;
  }
}
