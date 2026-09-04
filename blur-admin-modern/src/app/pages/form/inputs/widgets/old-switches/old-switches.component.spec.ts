import { TestBed } from '@angular/core/testing';
import { OldSwitchesComponent } from './old-switches.component';

describe('OldSwitchesComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [OldSwitchesComponent] }).compileComponents());
  it('renders five legacy switch replacements', () => {
    const fixture = TestBed.createComponent(OldSwitchesComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-old-switch').length).toBe(5);
  });
});
