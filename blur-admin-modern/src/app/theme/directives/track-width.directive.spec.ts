import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TrackWidthDirective } from './track-width.directive';

@Component({
  standalone: true,
  imports: [TrackWidthDirective],
  template: '<div trackWidth [minWidth]="200" (trackWidthChange)="states.push($event)"></div>',
})
class TrackWidthHost {
  states: boolean[] = [];
}

describe('TrackWidthDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TrackWidthHost] }));

  it('creates', () => expect(TestBed.createComponent(TrackWidthHost)).toBeTruthy());

  it('emits when the host width crosses the threshold', fakeAsync(() => {
    const fixture = TestBed.createComponent(TrackWidthHost);
    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    Object.defineProperty(element, 'offsetWidth', { configurable: true, value: 100 });
    fixture.detectChanges();
    expect(fixture.componentInstance.states).toEqual([true]);
    window.dispatchEvent(new Event('resize'));
    tick();
    expect(fixture.componentInstance.states).toEqual([true]);
  }));
});
