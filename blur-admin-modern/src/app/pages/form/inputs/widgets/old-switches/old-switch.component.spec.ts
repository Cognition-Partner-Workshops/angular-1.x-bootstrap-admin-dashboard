import { TestBed } from '@angular/core/testing';
import { OldSwitchComponent } from './old-switch.component';

describe('OldSwitchComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [OldSwitchComponent] }).compileComponents());
  it('renders a small colored switch', () => {
    const fixture = TestBed.createComponent(OldSwitchComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.switch-container.primary')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]').checked).toBeTrue();
  });
});
