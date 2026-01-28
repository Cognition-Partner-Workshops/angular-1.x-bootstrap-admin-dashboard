import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() icon = 'empty';
  @Input() title = 'No data available';
  @Input() message = '';
  @Input() actionLabel = '';
  @Output() actionClick = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClick.emit();
  }

  getIconLetter(): string {
    const iconMap: Record<string, string> = {
      empty: 'E',
      search: 'S',
      error: '!',
      folder: 'F',
      user: 'U',
      file: 'D'
    };
    return iconMap[this.icon] || this.icon.charAt(0).toUpperCase();
  }
}
