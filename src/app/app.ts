import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { PageTopComponent } from './theme/components/page-top/page-top.component';
import { ContentTopComponent } from './theme/components/content-top/content-top.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { BaSidebarService } from './theme/services/ba-sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    PageTopComponent,
    ContentTopComponent,
    BackTopComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  title = 'Blur Admin';
  pageLoaded = true;
  currentYear = new Date().getFullYear();

  constructor(public sidebarService: BaSidebarService) {}
}
