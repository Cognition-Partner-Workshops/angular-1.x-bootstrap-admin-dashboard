import { TestBed } from '@angular/core/testing';
import { StandardFieldsComponent } from './standard-fields.component';

describe('StandardFieldsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [StandardFieldsComponent] }).compileComponents());
  it('renders the legacy eight standard fields', () => {
    const fixture = TestBed.createComponent(StandardFieldsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('input,textarea').length).toBe(8);
  });
});
