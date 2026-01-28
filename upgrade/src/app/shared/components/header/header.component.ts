import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AuthPort, User } from '../../../core/ports/auth.port';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle = '';
  
  currentUser: User | null = null;
  showUserMenu = false;
  private destroy$ = new Subject<void>();
  private authPort = inject(AuthPort);

  ngOnInit(): void {
    this.authPort.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  logout(): void {
    this.authPort.logout().subscribe(() => {
      this.closeUserMenu();
    });
  }

  getUserInitials(): string {
    if (!this.currentUser?.name) {
      return 'U';
    }
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return names[0].charAt(0);
  }
}
