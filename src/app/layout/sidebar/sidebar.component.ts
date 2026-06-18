import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sidebarVisible = signal(true);

  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'fa fa-home', route: '/dashboard' },
    {
      title: 'Charts', icon: 'fa fa-bar-chart',
      children: [
        { title: 'Chart.js', icon: '', route: '/charts/chartJs' },
        { title: 'amCharts', icon: '', route: '/charts/amCharts' },
        { title: 'Morris', icon: '', route: '/charts/morris' },
        { title: 'Chartist', icon: '', route: '/charts/chartist' },
      ],
    },
    {
      title: 'UI Elements', icon: 'fa fa-laptop',
      children: [
        { title: 'Typography', icon: '', route: '/ui/typography' },
        { title: 'Buttons', icon: '', route: '/ui/buttons' },
        { title: 'Icons', icon: '', route: '/ui/icons' },
        { title: 'Modals', icon: '', route: '/ui/modals' },
        { title: 'Alerts', icon: '', route: '/ui/alerts' },
        { title: 'Progress Bars', icon: '', route: '/ui/progressBars' },
        { title: 'Notifications', icon: '', route: '/ui/notifications' },
        { title: 'Grid', icon: '', route: '/ui/grid' },
        { title: 'Panels', icon: '', route: '/ui/panels' },
        { title: 'Slider', icon: '', route: '/ui/slider' },
        { title: 'Tabs & Accordions', icon: '', route: '/ui/tabs' },
      ],
    },
    {
      title: 'Components', icon: 'fa fa-puzzle-piece',
      children: [
        { title: 'Mail', icon: '', route: '/components/mail' },
        { title: 'Timeline', icon: '', route: '/components/timeline' },
        { title: 'Tree View', icon: '', route: '/components/tree' },
      ],
    },
    {
      title: 'Form Elements', icon: 'fa fa-pencil',
      children: [
        { title: 'Form Inputs', icon: '', route: '/form/inputs' },
        { title: 'Form Layouts', icon: '', route: '/form/layouts' },
        { title: 'Form Wizard', icon: '', route: '/form/wizard' },
      ],
    },
    {
      title: 'Tables', icon: 'fa fa-table',
      children: [
        { title: 'Basic Tables', icon: '', route: '/tables/basic' },
        { title: 'Smart Table', icon: '', route: '/tables/smart' },
      ],
    },
    {
      title: 'Maps', icon: 'fa fa-map-marker',
      children: [
        { title: 'Google Maps', icon: '', route: '/maps/gmap' },
        { title: 'Leaflet', icon: '', route: '/maps/leaflet' },
        { title: 'Bubble Map', icon: '', route: '/maps/bubble' },
        { title: 'Line Map', icon: '', route: '/maps/line' },
      ],
    },
    {
      title: 'Pages', icon: 'fa fa-file-text-o',
      children: [
        { title: 'User Profile', icon: '', route: '/profile' },
      ],
    },
  ];

  toggleItem(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  toggleSidebar(): void {
    this.sidebarVisible.update(v => !v);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth <= 500) {
      this.sidebarVisible.set(false);
    }
  }
}
