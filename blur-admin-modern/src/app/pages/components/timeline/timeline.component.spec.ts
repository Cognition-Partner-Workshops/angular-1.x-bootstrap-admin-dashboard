import { TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [TimelineComponent] }).compileComponents());
  it('renders all timeline blocks and icon', () => {
    const fixture = TestBed.createComponent(TimelineComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.cd-timeline-block').length).toBe(7);
    expect(fixture.nativeElement.textContent).toContain('Title of section 1');
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toContain('Euro-Coin');
  });
});
