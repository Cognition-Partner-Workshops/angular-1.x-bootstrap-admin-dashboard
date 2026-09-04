import { DOCUMENT } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StopableIntervalService } from './stopable-interval.service';

describe('StopableIntervalService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [StopableIntervalService, { provide: DOCUMENT, useValue: document }] }));

  it('creates', () => {
    expect(TestBed.inject(StopableIntervalService)).toBeTruthy();
  });

  it('pauses on blur, restarts on focus, and stops listeners', fakeAsync(() => {
    const callback = jasmine.createSpy('callback');
    const handle = TestBed.inject(StopableIntervalService).start(callback, 10);
    tick(10);
    expect(callback).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event('blur'));
    tick(20);
    expect(callback).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event('focus'));
    tick(10);
    expect(callback).toHaveBeenCalledTimes(2);
    handle.stop();
    tick(20);
    expect(callback).toHaveBeenCalledTimes(2);
  }));
});
