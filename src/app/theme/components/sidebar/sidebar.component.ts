import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaSidebarService, MenuItem } from '../../services/ba-sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems: MenuItem[] = [];
  hoverElemTop = 0;
  hoverElemHeight = 0;
  showHoverElem = false;

  constructor(public sidebarService: BaSidebarService) {
    this.menuItems = [
      { title: 'Dashboard', icon: 'fa fa-home', stateRef: '/dashboard', order: 0 },
      {
        title: 'Charts', icon: 'fa fa-bar-chart', order: 150, subMenu: [
          { title: 'amCharts', stateRef: '/charts/am-charts' },
          { title: 'Chart.js', stateRef: '/charts/chart-js' },
          { title: 'Chartist', stateRef: '/charts/chartist' },
          { title: 'Morris', stateRef: '/charts/morris' },
        ]
      },
      {
        title: 'UI Features', icon: 'fa fa-laptop', order: 200, subMenu: [
          { title: 'Typography', stateRef: '/ui/typography' },
          { title: 'Buttons', stateRef: '/ui/buttons' },
          { title: 'Icons', stateRef: '/ui/icons' },
          { title: 'Modals', stateRef: '/ui/modals' },
          { title: 'Grid', stateRef: '/ui/grid' },
          { title: 'Alerts', stateRef: '/ui/alerts' },
          { title: 'Progress Bars', stateRef: '/ui/progress-bars' },
          { title: 'Notifications', stateRef: '/ui/notifications' },
          { title: 'Tabs', stateRef: '/ui/tabs' },
          { title: 'Slider', stateRef: '/ui/slider' },
          { title: 'Panels', stateRef: '/ui/panels' },
        ]
      },
      {
        title: 'Form Elements', icon: 'fa fa-pencil-square-o', order: 250, subMenu: [
          { title: 'Form Inputs', stateRef: '/form/inputs' },
          { title: 'Form Layouts', stateRef: '/form/layouts' },
          { title: 'Form Wizard', stateRef: '/form/wizard' },
        ]
      },
      {
        title: 'Tables', icon: 'fa fa-th', order: 300, subMenu: [
          { title: 'Basic Tables', stateRef: '/tables/basic' },
          { title: 'Smart Tables', stateRef: '/tables/smart' },
        ]
      },
      {
        title: 'Maps', icon: 'fa fa-map-marker', order: 500, subMenu: [
          { title: 'Google Maps', stateRef: '/maps/google-maps' },
          { title: 'Leaflet Maps', stateRef: '/maps/leaflet' },
          { title: 'Bubble Maps', stateRef: '/maps/map-bubbles' },
          { title: 'Line Maps', stateRef: '/maps/map-lines' },
        ]
      },
      {
        title: 'Components', icon: 'fa fa-cogs', order: 100, subMenu: [
          { title: 'Mail', stateRef: '/components/mail' },
          { title: 'Timeline', stateRef: '/components/timeline' },
          { title: 'Tree View', stateRef: '/components/tree' },
        ]
      },
      {
        title: 'Pages', icon: 'fa fa-file-o', subMenu: [
          { title: 'Sign In', fixedHref: '/auth/login', blank: true },
          { title: 'Sign Up', fixedHref: '/auth/register', blank: true },
          { title: 'User Profile', stateRef: '/profile' },
          { title: '404 Page', fixedHref: '/not-found', blank: true },
        ]
      },
      {
        title: 'Menu Level 1', icon: 'fa fa-ellipsis-h', subMenu: [
          { title: 'Menu Level 1.1', disabled: true },
          {
            title: 'Menu Level 1.2', subMenu: [
              { title: 'Menu Level 1.2.1', disabled: true },
            ]
          },
        ]
      },
    ];
  }

  hoverItem(event: MouseEvent, _item: MenuItem): void {
    this.showHoverElem = true;
    const target = event.currentTarget as HTMLElement;
    this.hoverElemHeight = target.clientHeight;
    const menuTopValue = 66;
    this.hoverElemTop = target.getBoundingClientRect().top - menuTopValue;
  }

  toggleSubMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

  @HostListener('window:resize')
  onResize(): void {
    const newCollapsed = this.sidebarService.shouldMenuBeCollapsed();
    if (newCollapsed !== this.sidebarService.isMenuCollapsed()) {
      this.sidebarService.setMenuCollapsed(newCollapsed);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showHoverElem = false;
  }
}
