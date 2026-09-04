import { TestBed } from '@angular/core/testing';
import { ProgressBarsComponent } from './progress-bars.component';

describe('ProgressBarsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProgressBarsComponent] }).compileComponents();
  });

  it('renders five panels and twenty progress bars', () => {
    const fixture = TestBed.createComponent(ProgressBarsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.panel-heading').length).toBe(5);
    expect(fixture.nativeElement.querySelectorAll('.progress-bar').length).toBe(20);
    expect(fixture.nativeElement.querySelectorAll('.progress-bar-animated').length).toBe(5);
    expect((fixture.nativeElement.querySelector('.progress-bar') as HTMLElement).style.width).toBe('40%');
  });
});
