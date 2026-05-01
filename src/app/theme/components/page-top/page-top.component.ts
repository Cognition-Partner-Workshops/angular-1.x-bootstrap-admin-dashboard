import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaSidebarService } from '../../services/ba-sidebar.service';
import { ProfilePicturePipe } from '../../pipes/profile-picture.pipe';
import { MsgCenterComponent } from '../msg-center/msg-center.component';

@Component({
  selector: 'app-page-top',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfilePicturePipe, MsgCenterComponent],
  templateUrl: './page-top.component.html',
})
export class PageTopComponent {
  scrolled = false;
  profileDropdownOpen = false;

  constructor(public sidebarService: BaSidebarService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.sidebarService.toggleMenuCollapsed();
  }

  toggleProfileDropdown(): void {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }
}
