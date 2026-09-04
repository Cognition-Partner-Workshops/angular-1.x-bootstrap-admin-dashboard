import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { LAYOUT_SIZES } from '../../layout-sizes';

export interface BaMenuItem {
  title: string;
  icon?: string;
  stateRef?: string;
  fixedHref?: string;
  blank?: boolean;
  disabled?: boolean;
  level?: number;
  order?: number;
  subMenu?: BaMenuItem[] | null;
  expanded?: boolean;
  slideRight?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BaSidebarService {
  readonly menuCollapsed = signal(this.shouldMenuBeCollapsed());
  private readonly router = inject(Router);
  private readonly staticMenuItems: BaMenuItem[] = [];

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.canSidebarBeHidden()) {
        this.setMenuCollapsed(true);
      }
    });
  }

  isMenuCollapsed(): boolean {
    return this.menuCollapsed();
  }

  setMenuCollapsed(collapsed: boolean): void {
    this.menuCollapsed.set(collapsed);
  }

  toggleMenuCollapsed(): void {
    this.setMenuCollapsed(!this.isMenuCollapsed());
  }

  shouldMenuBeCollapsed(): boolean {
    return window.innerWidth <= LAYOUT_SIZES.resWidthCollapseSidebar;
  }

  canSidebarBeHidden(): boolean {
    return window.innerWidth <= LAYOUT_SIZES.resWidthHideSidebar;
  }

  addStaticItem(...items: BaMenuItem[]): void {
    this.staticMenuItems.push(...items);
  }

  getAllStateRefsRecursive(item: BaMenuItem): string[] {
    return [
      ...(item.stateRef ? [item.stateRef] : []),
      ...(item.subMenu ?? []).flatMap((child) => this.getAllStateRefsRecursive(child)),
    ];
  }

  getMenuItems(): BaMenuItem[] {
    const layout = this.router.config.find((route) => route.path === '' && !!route.children);
    const candidates: BaMenuItem[] = [];
    const walk = (routes: Route[], parentPath: string, depth: number): void => {
      for (const route of routes) {
        const path = this.joinPath(parentPath, route.path ?? '');
        const meta = route.data?.['sidebarMeta'] as { icon?: string; order?: number } | undefined;
        if (meta && !candidates.some((item) => item.stateRef === path)) {
          candidates.push({
            title: String(route.data?.['title'] ?? ''),
            icon: meta.icon,
            stateRef: path,
            level: depth,
            order: meta.order ?? 0,
          });
        }
        const loadedRoutes = (route as Route & { _loadedRoutes?: Route[] })._loadedRoutes;
        walk([...(route.children ?? []), ...(loadedRoutes ?? [])], path, depth + 1);
      }
    };

    if (layout) {
      walk([...(layout.children ?? [])], '', 0);
    }
    candidates.sort((a, b) => (a.level! - b.level!) * 100 + (a.order ?? 0) - (b.order ?? 0));
    const menuItems = candidates.filter((item) => item.level === 0);
    for (const parent of menuItems) {
      const children = candidates.filter(
        (item) => item.level === 1 && item.stateRef?.startsWith(parent.stateRef ?? ''),
      );
      parent.subMenu = children.length ? children : null;
    }
    return menuItems.concat(this.staticMenuItems);
  }

  private joinPath(parent: string, segment: string): string {
    const parts = [...parent.split('/'), segment].filter(Boolean);
    return '/' + parts.join('/');
  }
}
