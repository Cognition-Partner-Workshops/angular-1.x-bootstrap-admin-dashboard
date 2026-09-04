import { TestBed } from '@angular/core/testing';
import { DatepickersComponent } from './datepickers.component';

describe('DatepickersComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [DatepickersComponent] }).compileComponents());
  it('renders inline and popup datepickers', () => {
    const fixture = TestBed.createComponent(DatepickersComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ngb-datepicker').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('select.format-select option:not(:first-child)').length).toBe(4);
  });
});
