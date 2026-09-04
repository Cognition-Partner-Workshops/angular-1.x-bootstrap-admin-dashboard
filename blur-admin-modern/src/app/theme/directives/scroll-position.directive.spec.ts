import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ScrollPositionDirective } from './scroll-position.directive';

@Component({
  standalone: true,
  imports: [ScrollPositionDirective],
  template: '<div scrollPosition [maxHeight]="10" (scrollPositionChange)="positions.push($event)"></div>',
})
class ScrollPositionHost {
  positions: boolean[] = [];
}

describe('ScrollPositionDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ScrollPositionHost] }));

  it('creates', () => expect(TestBed.createComponent(ScrollPositionHost)).toBeTruthy());

  it('emits only when the threshold state changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(ScrollPositionHost);
    fixture.detectChanges();
    expect(fixture.componentInstance.positions).toEqual([false]);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 20 });
    window.dispatchEvent(new Event('scroll'));
    tick();
    window.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.positions).toEqual([false, true]);
  }));
});
