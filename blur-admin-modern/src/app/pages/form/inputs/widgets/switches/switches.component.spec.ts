import { TestBed } from '@angular/core/testing';
import { SwitchesComponent } from './switches.component';

describe('SwitchesComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [SwitchesComponent] }).compileComponents());
  it('renders five switchers', () => {
    const fixture = TestBed.createComponent(SwitchesComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ba-switcher').length).toBe(5);
  });
});
