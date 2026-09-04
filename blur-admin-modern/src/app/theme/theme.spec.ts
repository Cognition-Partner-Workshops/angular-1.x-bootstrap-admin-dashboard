import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppImagePipe } from './pipes/app-image.pipe';
import { KameleonImgPipe } from './pipes/kameleon-img.pipe';
import { PlainTextPipe } from './pipes/plain-text.pipe';
import { ProfilePicturePipe } from './pipes/profile-picture.pipe';
import { BaConfigService } from './ba-config.service';
import { mix, shade, tint } from './color-helper';
import { BaUtilService } from './services/ba-util.service';
import { FileReaderService } from './services/file-reader.service';
import { PreloaderService } from './services/preloader.service';
import { StopableIntervalService } from './services/stopable-interval.service';
import { BaProgressModalService } from './services/ba-progress-modal.service';
import { BaPageLoadingService } from './services/ba-page-loading.service';
import { ZoomInDirective } from './directives/zoom-in.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { AutoExpandDirective } from './directives/auto-expand.directive';
import { AnimatedChangeDirective } from './directives/animated-change.directive';
import { NgFileSelectDirective } from './directives/ng-file-select.directive';
import { ScrollPositionDirective } from './directives/scroll-position.directive';
import { TrackWidthDirective } from './directives/track-width.directive';
import { ProgressModalComponent } from './components/progress-modal/progress-modal.component';
import { BaPanelComponent } from './components/ba-panel/ba-panel.component';
import { BaPanelSelfDirective } from './components/ba-panel/ba-panel-self.directive';
import { BaPanelBlurHelperService } from './components/ba-panel/ba-panel-blur-helper.service';
import { BaWizardComponent } from './components/ba-wizard/ba-wizard.component';
import { BaWizardStepComponent } from './components/ba-wizard/ba-wizard-step.component';
import { BaSliderComponent } from './components/ba-slider/ba-slider.component';
import { BaSwitcherComponent } from './inputs/ba-switcher/ba-switcher.component';

@Component({
  standalone: true,
  imports: [BaPanelComponent],
  template: `<ba-panel title="Title" baPanelClass="custom"><span>Content</span></ba-panel>`,
})
class PanelHost {}

@Component({
  standalone: true,
  imports: [BaWizardComponent, BaWizardStepComponent, ReactiveFormsModule],
  template: `<ba-wizard><ba-wizard-step title="One" /><ba-wizard-step title="Two" /></ba-wizard>`,
})
class WizardHost {}

describe('theme constants and pipes', () => {
  it('mixes colors using the legacy formula', () => {
    expect(mix('#ffffff', '#209e91', 30)).toBe('#62bbb2');
    expect(tint('#209e91', 30)).toBe('#62bbb2');
    expect(shade('#209e91', 15)).toBe('#1b867b');
    expect(tint('#2dacd1', 30)).toBe('#6cc4de');
    expect(shade('#2dacd1', 15)).toBe('#2692b1');
    expect(tint('#90b900', 30)).toBe('#b1ce4c');
    expect(shade('#90b900', 15)).toBe('#7a9d00');
    expect(tint('#dfb81c', 30)).toBe('#e8cd60');
    expect(shade('#dfb81c', 15)).toBe('#bd9c17');
    expect(tint('#e85656', 30)).toBe('#ee8888');
    expect(shade('#e85656', 15)).toBe('#c54949');
    expect(tint('#000000', 30)).toBe('#4c4c4c');
    expect(shade('#ffffff', 15)).toBe('#d8d8d8');
  });

  it('creates exact image and text pipe values', () => {
    expect(new AppImagePipe().transform('foo.png')).toBe('assets/img/foo.png');
    expect(new KameleonImgPipe().transform('face')).toBe('assets/img/theme/icon/kameleon/face.svg');
    expect(new ProfilePicturePipe().transform('bob')).toBe('assets/img/app/profile/bob.png');
    expect(new ProfilePicturePipe().transform('bob', 'jpg')).toBe('assets/img/app/profile/bob.jpg');
    expect(new PlainTextPipe().transform('<b>Hello</b>')).toBe('Hello');
  });
});

describe('theme services', () => {
  it('maintains palette and recursively merges configuration', () => {
    const config = new BaConfigService();
    expect(config.colors.primaryLight).toBe('#62bbb2');
    config.changeColors({ dashboard: { white: '#fff' } });
    expect(config.colors.dashboard.white).toBe('#fff');
    config.changeTheme({ blur: true });
    expect(config.theme.blur).toBeTrue();
  });

  it('provides DOM utility methods', () => {
    const util = new BaUtilService();
    const parent = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(child);
    parent.setAttribute('data-test', '');
    expect(util.isDescendant(parent, child)).toBeTrue();
    expect(util.hexToRGB('#209e91', 0.5)).toBe('rgba(32, 158, 145, 0.5)');
    expect(util.hasAttr(parent, 'data-test')).toBeTrue();
  });

  it('creates preloader and stoppable interval services', fakeAsync(() => {
    const preloader = new PreloaderService();
    let amChartsLoaded = false;
    preloader.loadAmCharts().then(() => (amChartsLoaded = true));
    tick();
    expect(amChartsLoaded).toBeTrue();
    const interval = new StopableIntervalService(document).start(() => undefined, 10);
    interval.stop();
    tick();
  }));

  it('reads a real Blob as a data URL', (done) => {
    const reader = new FileReaderService();
    reader.readAsDataUrl(new Blob(['hi'])).then((result) => {
      expect(result).toContain('data:');
      done();
    });
  });

  it('opens and closes the progress modal with guards', () => {
    const ref = { close: jasmine.createSpy('close') };
    const modal = { open: jasmine.createSpy('open').and.returnValue(ref) } as unknown as NgbModal;
    const service = new BaProgressModalService(modal);
    service.setProgress(50);
    expect(service.getProgress()).toBe(50);
    service.open();
    expect(modal.open).toHaveBeenCalledWith(ProgressModalComponent, jasmine.any(Object));
    expect(() => service.open()).toThrowError('Progress modal opened now');
    service.close();
    expect(ref.close).toHaveBeenCalled();
    expect(() => service.close()).toThrowError('Progress modal is not active');
  });
});

describe('theme components and directives', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PanelHost, WizardHost, ProgressModalComponent, BaSliderComponent, BaSwitcherComponent,
        ZoomInDirective, AutoFocusDirective, AutoExpandDirective, AnimatedChangeDirective,
        NgFileSelectDirective, ScrollPositionDirective, TrackWidthDirective,
      ],
    });
  });

  it('renders a panel with title, projected content, and custom class', () => {
    const fixture = TestBed.createComponent(PanelHost);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.panel') as HTMLElement;
    expect(panel.querySelector('.panel-heading')).toBeTruthy();
    expect(panel.textContent).toContain('Title');
    expect(panel.textContent).toContain('Content');
    expect(panel.classList).toContain('custom');
  });

  it('renders progress modal SVG and progress arc', () => {
    const progress = TestBed.inject(BaProgressModalService);
    progress.setProgress(50);
    const fixture = TestBed.createComponent(ProgressModalComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('50%');
    expect(fixture.nativeElement.querySelector('#loader').getAttribute('stroke-dasharray')).toContain(
      String(Math.PI * 90),
    );
  });

  it('creates wizard and slider components', () => {
    const wizard = TestBed.createComponent(WizardHost);
    wizard.detectChanges();
    expect(wizard.nativeElement.querySelector('.ba-wizard')).toBeTruthy();
    const slider = TestBed.createComponent(BaSliderComponent);
    slider.componentRef.setInput('from', 30);
    slider.detectChanges();
    expect(slider.nativeElement.querySelector('ngx-slider')).toBeTruthy();
  });

  it('creates switcher and toggles its model', () => {
    const fixture = TestBed.createComponent(BaSwitcherComponent);
    fixture.componentRef.setInput('switcherStyle', 'primary');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.click();
    expect(fixture.componentInstance.switcherValue()).toBeTrue();
    expect(fixture.nativeElement.querySelector('.switcher').classList).toContain('primary');
  });

  it('zooms in after the page loading delay', fakeAsync(() => {
    const fixture = TestBed.createComponent(BaPanelComponent);
    fixture.detectChanges();
    tick(1000);
    expect(fixture.nativeElement.querySelector('.panel').classList).toContain('zoomIn');
  }));

  it('provides the remaining directive classes', () => {
    expect(TestBed.inject(BaPageLoadingService)).toBeTruthy();
    expect(TestBed.inject(BaPanelBlurHelperService)).toBeTruthy();
  });
});
