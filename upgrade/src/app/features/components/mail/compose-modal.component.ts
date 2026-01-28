import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalRef } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-compose-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compose-modal.component.html',
  styleUrl: './compose-modal.component.scss'
})
export class ComposeModalComponent implements AfterViewInit {
  @ViewChild('editorContent') editorContent!: ElementRef<HTMLDivElement>;
  
  @Input() subject = '';
  @Input() to = '';
  @Input() text = '';
  
  modalRef!: ModalRef;

  ngAfterViewInit(): void {
    if (this.text && this.editorContent) {
      this.editorContent.nativeElement.innerHTML = this.text;
    }
  }

  close(): void {
    this.modalRef.close();
  }

  send(): void {
    this.modalRef.close({ sent: true });
  }

  execCommand(command: string, value: string | undefined = undefined): void {
    document.execCommand(command, false, value);
  }

  formatBlock(tag: string): void {
    document.execCommand('formatBlock', false, tag);
  }

  insertLink(): void {
    const url = window.prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  }
}
