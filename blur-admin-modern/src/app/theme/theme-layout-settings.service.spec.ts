import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { BaConfigService } from './ba-config.service';
import { ThemeLayoutSettingsService } from './theme-layout-settings.service';

describe('ThemeLayoutSettingsService', () => {
  beforeEach(() => {
    document.body.classList.remove('blur-theme', 'mobile');
    TestBed.resetTestingModule();
  });

  it('creates without adding blur-theme when blur is disabled', () => {
    TestBed.configureTestingModule({
      providers: [BaConfigService, ThemeLayoutSettingsService],
    });
    expect(TestBed.inject(ThemeLayoutSettingsService)).toBeTruthy();
    expect(document.body.classList).not.toContain('blur-theme');
  });

  it('adds blur-theme when the configured theme is blurred', () => {
    const config = new BaConfigService();
    config.theme.blur = true;
    TestBed.configureTestingModule({
      providers: [
        { provide: BaConfigService, useValue: config },
        ThemeLayoutSettingsService,
        { provide: DOCUMENT, useValue: document },
      ],
    });
    const service = TestBed.inject(ThemeLayoutSettingsService);
    expect(service.blur).toBeTrue();
    expect(document.body.classList).toContain('blur-theme');
  });
});
