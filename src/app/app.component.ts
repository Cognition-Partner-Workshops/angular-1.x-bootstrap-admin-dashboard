import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { PageTopComponent } from './theme/components/page-top/page-top.component';
import { ContentTopComponent } from './theme/components/content-top/content-top.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { SidebarService } from './theme/services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    PageTopComponent,
    ContentTopComponent,
    BackTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  constructor(public sidebarService: SidebarService) {}
}
