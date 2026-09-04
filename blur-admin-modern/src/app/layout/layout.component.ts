import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BaPageLoadingService, BaSidebarComponent, BackTopComponent, ContentTopComponent,
  PageTopComponent, BaSidebarService, ThemeLayoutSettingsService,
} from '../theme';
import { ThemeRunService } from '../theme/services/theme-run.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, BaSidebarComponent, PageTopComponent, ContentTopComponent, BackTopComponent],
  template: `
    <div class="body-bg"></div>
    @if (pageLoading.pageFinishedLoading()) {
      <main [class.menu-collapsed]="sidebar.isMenuCollapsed()">
        <ba-sidebar /><page-top />
        <div class="al-main"><div class="al-content"><content-top /><router-outlet /></div></div>
        <footer class="al-footer clearfix">
          <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
          <div class="al-footer-main clearfix">
            <div class="al-copy">Blur Admin 2016</div>
            <ul class="al-share clearfix">
              <li><i class="socicon socicon-facebook"></i></li>
              <li><i class="socicon socicon-twitter"></i></li>
              <li><i class="socicon socicon-google"></i></li>
              <li><i class="socicon socicon-github"></i></li>
            </ul>
          </div>
        </footer>
        <back-top />
      </main>
    }
    <div id="preloader" [style.display]="pageLoading.pageFinishedLoading() ? 'none' : ''"><div></div></div>
  `,
})
export class LayoutComponent {
  readonly pageLoading = inject(BaPageLoadingService);
  readonly sidebar = inject(BaSidebarService);
  private readonly settings = inject(ThemeLayoutSettingsService);
  private readonly themeRun = inject(ThemeRunService);

  constructor() {
    void this.settings;
    this.themeRun.run();
  }
}
