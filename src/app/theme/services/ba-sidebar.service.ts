import { Injectable } from '@angular/core';
import { LAYOUT_SIZES } from './layout.constants';

export interface MenuItem {
  title: string;
  icon?: string;
  stateRef?: string;
  fixedHref?: string;
  blank?: boolean;
  disabled?: boolean;
  subMenu?: MenuItem[];
  order?: number;
  selected?: boolean;
  expanded?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BaSidebarService {
  private isCollapsed = this.shouldMenuBeCollapsed();

  shouldMenuBeCollapsed(): boolean {
    return window.innerWidth <= LAYOUT_SIZES.resWidthCollapseSidebar;
  }

  canSidebarBeHidden(): boolean {
    return window.innerWidth <= LAYOUT_SIZES.resWidthHideSidebar;
  }

  isMenuCollapsed(): boolean {
    return this.isCollapsed;
  }

  setMenuCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }

  toggleMenuCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
