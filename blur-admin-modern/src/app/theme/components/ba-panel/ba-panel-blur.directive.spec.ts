import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BaPanelBlurHelperService } from './ba-panel-blur-helper.service';
import { BaPanelBlurDirective } from './ba-panel-blur.directive';
import { ThemeLayoutSettingsService } from '../../theme-layout-settings.service';

@Component({
  standalone: true,
  imports: [BaPanelBlurDirective],
  template: '<div [baPanelBlur]="enabled"></div>',
})
class PanelBlurHost {
  enabled = true;
}

describe('BaPanelBlurDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [PanelBlurHost],
    providers: [
      { provide: ThemeLayoutSettingsService, useValue: { mobile: false } },
      {
        provide: BaPanelBlurHelperService,
        useValue: {
          bodyBgLoad: () => Promise.resolve(),
          getBodyBgImageSizes: () => ({ width: 2000, height: 1000, positionX: -100, positionY: -50 }),
        },
      },
    ],
  }));

  it('creates', () => expect(TestBed.createComponent(PanelBlurHost)).toBeTruthy());

  it('sets host background size and position when enabled', fakeAsync(() => {
    const fixture = TestBed.createComponent(PanelBlurHost);
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.firstElementChild.style.backgroundSize).toBe('2000px 1000px');
    expect(fixture.nativeElement.firstElementChild.style.backgroundPosition).toBe('-100px -50px');
  }));
});
