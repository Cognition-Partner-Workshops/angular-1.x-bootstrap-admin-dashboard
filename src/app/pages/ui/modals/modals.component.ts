import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.scss',
})
export class ModalsComponent {
  activeModal: string | null = null;

  openModal(type: string): void {
    this.activeModal = type;
  }

  closeModal(): void {
    this.activeModal = null;
  }
}
