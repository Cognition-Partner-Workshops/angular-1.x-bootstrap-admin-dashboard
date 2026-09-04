import { TestBed } from '@angular/core/testing';
import { ValidationStatesComponent } from './validation-states.component';

describe('ValidationStatesComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ValidationStatesComponent] }).compileComponents());
  it('renders validation states', () => {
    const fixture = TestBed.createComponent(ValidationStatesComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.has-success,.has-warning,.has-error').length).toBeGreaterThan(5);
  });
});
