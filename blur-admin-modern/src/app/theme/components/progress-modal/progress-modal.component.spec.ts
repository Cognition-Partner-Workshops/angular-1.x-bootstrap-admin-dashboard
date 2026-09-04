import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaProgressModalService } from '../../services/ba-progress-modal.service';
import { ProgressModalComponent } from './progress-modal.component';

@Component({ standalone: true, imports: [ProgressModalComponent], template: '<ba-progress-modal />' })
class ProgressModalHost {}

describe('ProgressModalComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ProgressModalHost] }));

  it('creates', () => expect(TestBed.createComponent(ProgressModalHost)).toBeTruthy());

  it('renders progress text and the SVG arc', () => {
    TestBed.inject(BaProgressModalService).setProgress(50);
    const fixture = TestBed.createComponent(ProgressModalHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('50%');
    expect(fixture.nativeElement.querySelector('#loader').getAttribute('stroke-dasharray'))
      .toContain(String(Math.PI * 90));
  });
});
