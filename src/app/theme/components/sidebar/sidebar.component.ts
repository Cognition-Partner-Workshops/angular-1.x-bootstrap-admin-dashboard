import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService, MenuItem } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[];
  hoverElemTop = 0;
  hoverElemHeight = 0;
  showHoverElem = false;

  constructor(public sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.getMenuItems();
  }

  hoverItem(event: MouseEvent): void {
    this.showHoverElem = true;
    const target = event.currentTarget as HTMLElement;
    this.hoverElemHeight = target.clientHeight;
    const menuTopValue = 66;
    this.hoverElemTop = target.getBoundingClientRect().top - menuTopValue;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showHoverElem = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    const collapsed = this.sidebarService.shouldMenuBeCollapsed();
    this.sidebarService.setMenuCollapsed(collapsed);
  }
}
