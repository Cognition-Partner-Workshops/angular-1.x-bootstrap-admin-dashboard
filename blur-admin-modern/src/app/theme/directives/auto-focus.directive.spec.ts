import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  standalone: true,
  imports: [AutoFocusDirective],
  template: '<input [autoFocus]="active" (autoFocusChange)="active = $event">',
})
class AutoFocusHost {
  active = false;
}

describe('AutoFocusDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AutoFocusHost] }));

  it('creates', () => expect(TestBed.createComponent(AutoFocusHost)).toBeTruthy());

  it('focuses on activation and emits false on blur', fakeAsync(() => {
    const fixture = TestBed.createComponent(AutoFocusHost);
    fixture.componentInstance.active = true;
    fixture.detectChanges();
    tick();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(fixture.componentInstance.active).toBeFalse();
  }));

  it('does not retain timers across repeated toggles', fakeAsync(() => {
    const fixture = TestBed.createComponent(AutoFocusHost);
    fixture.componentInstance.active = true;
    fixture.detectChanges();
    fixture.componentInstance.active = false;
    fixture.detectChanges();
    tick();
    expect(document.activeElement).not.toBe(fixture.nativeElement.querySelector('input'));
  }));
});
