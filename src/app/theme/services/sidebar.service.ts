import { Injectable, signal, computed } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';

export interface MenuItem {
  title: string;
  icon?: string;
  stateRef?: string;
  routerLink?: string;
  fixedHref?: string;
  blank?: boolean;
  disabled?: boolean;
  subMenu?: MenuItem[];
  order?: number;
  _expanded?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private menuCollapsed = signal(this.shouldMenuBeCollapsed());

  isMenuCollapsed = computed(() => this.menuCollapsed());

  constructor(private themeConfig: ThemeConfigService) {}

  getMenuItems(): MenuItem[] {
    return [
      {
        title: 'Dashboard',
        icon: 'fa fa-home',
        routerLink: '/dashboard',
        order: 0,
      },
      {
        title: 'UI Features',
        icon: 'fa fa-laptop',
        subMenu: [
          { title: 'Typography', routerLink: '/ui/typography' },
          { title: 'Buttons', routerLink: '/ui/buttons' },
          { title: 'Icons', routerLink: '/ui/icons' },
          { title: 'Modals', routerLink: '/ui/modals' },
          { title: 'Grid', routerLink: '/ui/grid' },
          { title: 'Alerts', routerLink: '/ui/alerts' },
          { title: 'Progress Bars', routerLink: '/ui/progress-bars' },
          { title: 'Notifications', routerLink: '/ui/notifications' },
          { title: 'Tabs & Accordions', routerLink: '/ui/tabs' },
          { title: 'Slider', routerLink: '/ui/slider' },
          { title: 'Panels', routerLink: '/ui/panels' },
        ],
        order: 100,
      },
      {
        title: 'Components',
        icon: 'fa fa-puzzle-piece',
        subMenu: [
          { title: 'Timeline', routerLink: '/components/timeline' },
          { title: 'Mail', routerLink: '/components/mail' },
          { title: 'Tree View', routerLink: '/components/tree' },
        ],
        order: 200,
      },
      {
        title: 'Form Elements',
        icon: 'fa fa-pencil-square-o',
        subMenu: [
          { title: 'Form Inputs', routerLink: '/form/inputs' },
          { title: 'Form Layouts', routerLink: '/form/layouts' },
          { title: 'Form Wizard', routerLink: '/form/wizard' },
        ],
        order: 400,
      },
      {
        title: 'Tables',
        icon: 'fa fa-table',
        subMenu: [
          { title: 'Basic Tables', routerLink: '/tables/basic' },
          { title: 'Smart Table', routerLink: '/tables/smart' },
        ],
        order: 500,
      },
      {
        title: 'Charts',
        icon: 'fa fa-bar-chart',
        subMenu: [
          { title: 'Chart.js', routerLink: '/charts/chartjs' },
        ],
        order: 600,
      },
      {
        title: 'Maps',
        icon: 'fa fa-map-marker',
        subMenu: [
          { title: 'Google Maps', routerLink: '/maps/google' },
          { title: 'Leaflet Maps', routerLink: '/maps/leaflet' },
        ],
        order: 700,
      },
      {
        title: 'Pages',
        icon: 'fa fa-file-text-o',
        subMenu: [
          { title: 'User Profile', routerLink: '/profile' },
        ],
        order: 800,
      },
      {
        title: 'Menu Level 1',
        icon: 'fa fa-ellipsis-h',
        subMenu: [
          { title: 'Menu Level 1.1', disabled: true },
          {
            title: 'Menu Level 1.2',
            subMenu: [
              { title: 'Menu Level 1.2.1', disabled: true },
            ],
          },
        ],
        order: 900,
      },
    ];
  }

  shouldMenuBeCollapsed(): boolean {
    return typeof window !== 'undefined'
      ? window.innerWidth <= this.themeConfig.layoutSizes.resWidthCollapseSidebar
      : false;
  }

  canSidebarBeHidden(): boolean {
    return typeof window !== 'undefined'
      ? window.innerWidth <= this.themeConfig.layoutSizes.resWidthHideSidebar
      : false;
  }

  setMenuCollapsed(collapsed: boolean): void {
    this.menuCollapsed.set(collapsed);
  }

  toggleMenuCollapsed(): void {
    this.menuCollapsed.update((v) => !v);
  }
}
