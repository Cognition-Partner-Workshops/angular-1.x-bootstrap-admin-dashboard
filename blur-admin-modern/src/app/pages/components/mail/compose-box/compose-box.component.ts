import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuillEditorComponent } from 'ngx-quill';
import type Quill from 'quill';

@Component({
  selector: 'app-compose-box',
  standalone: true,
  imports: [FormsModule, QuillEditorComponent],
  templateUrl: './compose-box.component.html',
})
export class ComposeBoxComponent {
  subject = '';
  to = '';
  text = '';
  quill?: Quill;
  readonly modules = { toolbar: false };
  readonly activeModal = inject(NgbActiveModal);

  onEditorCreated(editor: Quill): void {
    this.quill = editor;
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  private selectionIndex(): number {
    const length = this.quill?.getLength() ?? 1;
    return this.quill?.getSelection()?.index ?? Math.max(length - 1, 0);
  }

  insertLink(): void {
    const url = window.prompt('Link URL');
    if (url && this.quill) this.quill.format('link', url);
  }

  insertImage(): void {
    const url = window.prompt('Image URL');
    if (url && this.quill) this.quill.insertEmbed(this.selectionIndex(), 'image', url, 'user');
  }

  insertVideo(): void {
    const url = window.prompt('Video URL');
    if (url && this.quill) this.quill.insertEmbed(this.selectionIndex(), 'video', url, 'user');
  }

  toggleCode(): void {
    if (this.quill) this.quill.format('code-block', !this.quill.getFormat()['code-block']);
  }

  toggleQuote(): void {
    if (this.quill) this.quill.format('blockquote', !this.quill.getFormat()['blockquote']);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.dismiss();
  }
}
