import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageTopComponent } from './layout/page-top/page-top.component';
import { BackTopComponent } from './layout/back-top/back-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, PageTopComponent, BackTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  onToggleSidebar(): void {
    this.sidebar.toggleSidebar();
  }
}
