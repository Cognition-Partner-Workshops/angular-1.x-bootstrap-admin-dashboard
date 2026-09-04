import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tags-input.component.html',
})
export class TagsInputComponent {
  readonly tagStyle = input<'primary' | 'warning' | 'danger'>('primary');
  readonly tags = model<string[]>([]);
  readonly placeholder = input('Add Tag');
  draft = '';

  addTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim().replace(/,$/, '').trim();
    if (value) this.tags.update((tags) => [...tags, value]);
    input.value = '';
    this.draft = '';
  }

  onKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag(event);
    } else if (event.key === 'Backspace' && !input.value && this.tags().length) {
      this.tags.update((tags) => tags.slice(0, -1));
    }
  }

  removeTag(index: number): void {
    this.tags.update((tags) => tags.filter((_, i) => i !== index));
  }
}
