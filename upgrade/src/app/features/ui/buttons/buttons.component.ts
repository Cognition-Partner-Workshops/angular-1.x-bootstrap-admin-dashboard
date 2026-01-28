import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components/ba-panel';
import { ProgressButtonComponent } from './progress-button/progress-button.component';

interface DropdownItem {
  label: string;
  divider?: boolean;
}

interface DropdownButton {
  label: string;
  variant: string;
  items: DropdownItem[];
  isOpen: boolean;
}

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, BaPanelComponent, ProgressButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  dropdownButtons: DropdownButton[] = [
    { label: 'Primary', variant: 'primary', isOpen: false, items: this.getDropdownItems() },
    { label: 'Success', variant: 'success', isOpen: false, items: this.getDropdownItems() },
    { label: 'Info', variant: 'info', isOpen: false, items: this.getDropdownItems() },
    { label: 'Default', variant: 'default', isOpen: false, items: this.getDropdownItems() },
    { label: 'Warning', variant: 'warning', isOpen: false, items: this.getDropdownItems() },
    { label: 'Danger', variant: 'danger', isOpen: false, items: this.getDropdownItems() }
  ];

  splitDropdownButtons: DropdownButton[] = [
    { label: 'Primary', variant: 'primary', isOpen: false, items: this.getDropdownItems() },
    { label: 'Success', variant: 'success', isOpen: false, items: this.getDropdownItems() },
    { label: 'Info', variant: 'info', isOpen: false, items: this.getDropdownItems() },
    { label: 'Default', variant: 'default', isOpen: false, items: this.getDropdownItems() },
    { label: 'Warning', variant: 'warning', isOpen: false, items: this.getDropdownItems() },
    { label: 'Danger', variant: 'danger', isOpen: false, items: this.getDropdownItems() }
  ];

  progressButtonStyles = [
    { title: 'fill horizontal', style: 'fill', direction: 'horizontal', variant: 'success' },
    { title: 'fill vertical', style: 'fill', direction: 'vertical', variant: 'danger' },
    { title: 'shrink horizontal', style: 'shrink', direction: 'horizontal', variant: 'warning' },
    { title: 'shrink vertical', style: 'shrink', direction: 'vertical', variant: 'info' }
  ];

  progressButtonPerspective1 = [
    { title: 'rotate-angle-bottom perspective', style: 'rotate-angle-bottom', variant: 'success' },
    { title: 'rotate-angle-top perspective', style: 'rotate-angle-top', variant: 'danger' },
    { title: 'rotate-angle-left perspective', style: 'rotate-angle-left', variant: 'warning' },
    { title: 'rotate-angle-right perspective', style: 'rotate-angle-right', variant: 'info' }
  ];

  progressButtonPerspective2 = [
    { title: 'rotate-side-down perspective', style: 'rotate-side-down', variant: 'success' },
    { title: 'rotate-side-up perspective', style: 'rotate-side-up', variant: 'danger' },
    { title: 'rotate-side-left perspective', style: 'rotate-side-left', variant: 'warning' },
    { title: 'rotate-side-right perspective', style: 'rotate-side-right', variant: 'info' }
  ];

  progressButtonPerspective3 = [
    { title: 'rotate-back perspective', style: 'rotate-back', variant: 'success' },
    { title: 'flip-open perspective', style: 'flip-open', variant: 'danger' },
    { title: 'slide-down horizontal', style: 'slide-down', variant: 'warning' },
    { title: 'move-up horizontal', style: 'move-up', variant: 'info' }
  ];

  progressButtonLines = [
    { title: 'top-line horizontal', style: 'top-line', variant: 'success' },
    { title: 'lateral-lines vertical', style: 'lateral-lines', variant: 'info' }
  ];

  private getDropdownItems(): DropdownItem[] {
    return [
      { label: 'Action' },
      { label: 'Another action' },
      { label: 'Something else here' },
      { label: '', divider: true },
      { label: 'Separated link' }
    ];
  }

  toggleDropdown(dropdown: DropdownButton, event: Event): void {
    event.stopPropagation();
    this.closeAllDropdowns();
    dropdown.isOpen = !dropdown.isOpen;
  }

  closeAllDropdowns(): void {
    this.dropdownButtons.forEach(d => d.isOpen = false);
    this.splitDropdownButtons.forEach(d => d.isOpen = false);
  }

  onDocumentClick(): void {
    this.closeAllDropdowns();
  }
}
