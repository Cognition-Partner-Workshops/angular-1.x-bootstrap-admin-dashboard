import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BaPageLoadingService } from '../services/ba-page-loading.service';
import { ZoomInDirective } from './zoom-in.directive';

@Component({ standalone: true, imports: [ZoomInDirective], template: '<div class="full-invisible" zoomIn></div>' })
class ZoomHost {}

describe('ZoomInDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ZoomHost] }));

  it('creates', () => {
    expect(TestBed.createComponent(ZoomHost)).toBeTruthy();
  });

  it('reveals and animates after the configured delay', fakeAsync(() => {
    const fixture = TestBed.createComponent(ZoomHost);
    fixture.detectChanges();
    tick(1000);
    const element = fixture.nativeElement.firstElementChild as HTMLElement;
    expect(element.classList).not.toContain('full-invisible');
    expect(element.classList).toContain('animated');
    expect(element.classList).toContain('zoomIn');
  }));
});
