import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnimatedChangeDirective } from './animated-change.directive';

@Component({
  standalone: true,
  imports: [AnimatedChangeDirective],
  template: '<div animatedChange [newValue]="42">40</div><span><i></i></span>',
})
class AnimatedChangeHost {}

describe('AnimatedChangeDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AnimatedChangeHost] }));

  it('creates', () => expect(TestBed.createComponent(AnimatedChangeHost)).toBeTruthy());

  it('counts to the new value and reveals the adjacent arrow', fakeAsync(() => {
    const fixture = TestBed.createComponent(AnimatedChangeHost);
    fixture.detectChanges();
    tick(3500 + 60);
    expect(fixture.nativeElement.firstElementChild.textContent).toBe('42');
    tick(500);
    expect(fixture.nativeElement.querySelector('i').classList).toContain('show-arr');
  }));
});
