import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BaConfigService } from '../ba-config.service';
import { BaPageLoadingService } from './ba-page-loading.service';
import { PreloaderService } from './preloader.service';
import { ThemeLayoutSettingsService } from '../theme-layout-settings.service';
import { ThemeRunService } from './theme-run.service';

describe('ThemeRunService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ThemeRunService,
      { provide: PreloaderService, useValue: { loadAmCharts: () => Promise.resolve(), loadImg: () => Promise.resolve() } },
      { provide: ThemeLayoutSettingsService, useValue: { blur: true, mobile: false } },
      BaPageLoadingService, BaConfigService,
    ],
  }));
  it('waits for preload work and only starts once', fakeAsync(() => {
    const service = TestBed.inject(ThemeRunService);
    service.run();
    service.run();
    tick(3000);
    expect(TestBed.inject(BaPageLoadingService).pageFinishedLoading()).toBeTrue();
  }));
  it('uses the seven second fallback', fakeAsync(() => {
    const preloader = TestBed.inject(PreloaderService);
    spyOn(preloader, 'loadAmCharts').and.returnValue(new Promise(() => undefined));
    TestBed.inject(ThemeRunService).run();
    tick(7000);
    expect(TestBed.inject(BaPageLoadingService).pageFinishedLoading()).toBeTrue();
  }));
});
