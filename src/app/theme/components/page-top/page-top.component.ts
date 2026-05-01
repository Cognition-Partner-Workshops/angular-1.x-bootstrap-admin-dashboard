import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { MsgCenterComponent } from '../msg-center/msg-center.component';

@Component({
  selector: 'app-page-top',
  standalone: true,
  imports: [CommonModule, RouterModule, MsgCenterComponent],
  templateUrl: './page-top.component.html',
  styleUrl: './page-top.component.scss',
})
export class PageTopComponent {
  scrolled = signal(false);
  isProfileOpen = false;

  constructor(public sidebarService: SidebarService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleMenuCollapsed();
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }
}
