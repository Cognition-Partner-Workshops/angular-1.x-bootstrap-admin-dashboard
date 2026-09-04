import { TestBed } from '@angular/core/testing';
import { OldSelectsComponent } from './old-selects.component';

describe('OldSelectsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [OldSelectsComponent] }).compileComponents());
  it('renders the legacy select demos', () => {
    const fixture = TestBed.createComponent(OldSelectsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('select').length).toBe(14);
  });
});
