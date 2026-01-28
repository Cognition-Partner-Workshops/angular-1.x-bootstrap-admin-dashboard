import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { NavigationService, NavItem, NavigationState } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  navState: NavigationState = {
    items: [],
    collapsed: false,
    activeItemId: null
  };
  private destroy$ = new Subject<void>();
  private navigationService = inject(NavigationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.navigationService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.navState = state;
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const navEnd = event as NavigationEnd;
        this.updateActiveItem(navEnd.urlAfterRedirects);
      });

    this.updateActiveItem(this.router.url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.navigationService.toggleCollapsed();
  }

  getIconLetter(icon: string): string {
    const iconMap: Record<string, string> = {
      dashboard: 'D',
      people: 'U',
      settings: 'S',
      reports: 'R',
      analytics: 'A',
      notifications: 'N'
    };
    return iconMap[icon] || icon.charAt(0).toUpperCase();
  }

  trackByItemId(_index: number, item: NavItem): string {
    return item.id;
  }

  private updateActiveItem(url: string): void {
    const activeItem = this.navState.items.find(item => url.startsWith(item.path));
    this.navigationService.setActiveItem(activeItem?.id || null);
  }
}
