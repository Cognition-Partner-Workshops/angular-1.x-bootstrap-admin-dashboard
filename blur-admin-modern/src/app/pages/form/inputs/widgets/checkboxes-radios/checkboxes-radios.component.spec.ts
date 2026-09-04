import { TestBed } from '@angular/core/testing';
import { CheckboxesRadiosComponent } from './checkboxes-radios.component';

describe('CheckboxesRadiosComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [CheckboxesRadiosComponent] }).compileComponents());
  it('renders checkbox and radio demos', () => {
    const fixture = TestBed.createComponent(CheckboxesRadiosComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('input[type="checkbox"]').length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('input[type="radio"]').length).toBe(4);
  });
});
