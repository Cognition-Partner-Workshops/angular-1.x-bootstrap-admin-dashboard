import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: NavItem[];
  permission?: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'danger' | 'success';
}

export interface NavigationState {
  items: NavItem[];
  collapsed: boolean;
  activeItemId: string | null;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: '/upgrade/dashboard',
    permission: 'dashboard.view'
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'people',
    path: '/upgrade/users',
    permission: 'users.view'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    path: '/upgrade/settings',
    permission: 'settings.view'
  }
];

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private state$ = new BehaviorSubject<NavigationState>({
    items: DEFAULT_NAV_ITEMS,
    collapsed: false,
    activeItemId: null
  });

  getState(): Observable<NavigationState> {
    return this.state$.asObservable();
  }

  getItems(): NavItem[] {
    return this.state$.value.items;
  }

  isCollapsed(): boolean {
    return this.state$.value.collapsed;
  }

  toggleCollapsed(): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      collapsed: !current.collapsed
    });
  }

  setCollapsed(collapsed: boolean): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      collapsed
    });
  }

  setActiveItem(itemId: string | null): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      activeItemId: itemId
    });
  }

  addNavItem(item: NavItem, position?: number): void {
    const current = this.state$.value;
    const items = [...current.items];
    if (position !== undefined && position >= 0 && position <= items.length) {
      items.splice(position, 0, item);
    } else {
      items.push(item);
    }
    this.state$.next({
      ...current,
      items
    });
  }

  removeNavItem(itemId: string): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      items: current.items.filter(item => item.id !== itemId)
    });
  }

  updateNavItem(itemId: string, updates: Partial<NavItem>): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      items: current.items.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    });
  }
}
