import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PageTopComponent } from '../page-top/page-top.component';
import { ContentTopComponent } from '../content-top/content-top.component';
import { BackTopComponent } from '../back-top/back-top.component';
import { BaSidebarService } from '../../services/ba-sidebar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    PageTopComponent,
    ContentTopComponent,
    BackTopComponent,
  ],
  template: `
    <div class="body-bg"></div>
    <main [class.menu-collapsed]="sidebarService.isMenuCollapsed()">
      <app-sidebar></app-sidebar>
      <app-page-top></app-page-top>

      <div class="al-main">
        <div class="al-content">
          <app-content-top></app-content-top>
          <router-outlet></router-outlet>
        </div>
      </div>

      <footer class="al-footer clearfix">
        <div class="al-footer-right">Created with <i class="fa fa-heart"></i></div>
        <div class="al-footer-main clearfix">
          <div class="al-copy">Blur Admin &copy; {{ currentYear }}</div>
          <ul class="al-share clearfix">
            <li><i class="fab fa-facebook"></i></li>
            <li><i class="fab fa-twitter"></i></li>
            <li><i class="fab fa-google"></i></li>
            <li><i class="fab fa-github"></i></li>
          </ul>
        </div>
      </footer>

      <app-back-top></app-back-top>
    </main>
  `,
})
export class LayoutComponent {
  currentYear = new Date().getFullYear();

  constructor(public sidebarService: BaSidebarService) {}
}
