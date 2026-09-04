import { TestBed } from '@angular/core/testing';
import { BaProgressModalService } from '../../services/ba-progress-modal.service';
import { ProgressBarRoundComponent } from './progress-bar-round.component';

describe('ProgressBarRoundComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ProgressBarRoundComponent] }).compileComponents());
  it('creates, renders SVG and reflects progress in its arc', () => {
    TestBed.inject(BaProgressModalService).setProgress(50);
    const fixture = TestBed.createComponent(ProgressBarRoundComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('50%');
    expect(fixture.componentInstance.strokeDashArray()).toContain(String(90 * Math.PI));
  });
});
