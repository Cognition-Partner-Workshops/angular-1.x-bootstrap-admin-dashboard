import { Injectable, inject } from '@angular/core';
import { BaConfigService } from '../ba-config.service';
import { BaPageLoadingService } from './ba-page-loading.service';
import { LAYOUT_PATHS } from '../layout-paths';
import { PreloaderService } from './preloader.service';
import { ThemeLayoutSettingsService } from '../theme-layout-settings.service';

@Injectable({ providedIn: 'root' })
export class ThemeRunService {
  private readonly preloader = inject(PreloaderService);
  private readonly pageLoading = inject(BaPageLoadingService);
  private readonly settings = inject(ThemeLayoutSettingsService);
  private started = false;

  run(): void {
    if (this.started) return;
    this.started = true;
    const whatToWait: Promise<unknown>[] = [this.preloader.loadAmCharts(), new Promise((resolve) => setTimeout(resolve, 3000))];
    if (this.settings.blur) {
      if (this.settings.mobile) {
        whatToWait.unshift(this.preloader.loadImg(LAYOUT_PATHS.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(this.preloader.loadImg(LAYOUT_PATHS.images.root + 'blur-bg.jpg'));
        whatToWait.unshift(this.preloader.loadImg(LAYOUT_PATHS.images.root + 'blur-bg-blurred.jpg'));
      }
    }
    Promise.all(whatToWait).then(() => this.pageLoading.pageFinishedLoading.set(true));
    setTimeout(() => {
      if (!this.pageLoading.pageFinishedLoading()) this.pageLoading.pageFinishedLoading.set(true);
    }, 7000);
  }
}
