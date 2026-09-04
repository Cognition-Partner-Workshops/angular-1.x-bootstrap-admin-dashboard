import { TestBed } from '@angular/core/testing';
import { InputsComponent } from './inputs.component';

describe('InputsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [InputsComponent] }).compileComponents());
  it('renders all form input panels', () => {
    const fixture = TestBed.createComponent(InputsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Old On/Off Switches (Deprecated)');
    expect(fixture.nativeElement.textContent).toContain('Old selects(deprecated)');
    expect(fixture.nativeElement.querySelectorAll('ba-panel').length).toBe(10);
  });
});
