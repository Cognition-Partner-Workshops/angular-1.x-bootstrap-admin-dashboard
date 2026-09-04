import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaPanelSelfDirective } from './ba-panel-self.directive';

@Component({
  standalone: true,
  imports: [BaPanelSelfDirective],
  template: '<div baPanelSelf baPanelClass="custom"></div>',
})
class PanelSelfHost {}

describe('BaPanelSelfDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [PanelSelfHost] }));

  it('creates', () => expect(TestBed.createComponent(PanelSelfHost)).toBeTruthy());

  it('adds panel and custom classes to the host', () => {
    const fixture = TestBed.createComponent(PanelSelfHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.firstElementChild.classList).toContain('panel');
    expect(fixture.nativeElement.firstElementChild.classList).toContain('panel-white');
    expect(fixture.nativeElement.firstElementChild.classList).toContain('custom');
  });
});
