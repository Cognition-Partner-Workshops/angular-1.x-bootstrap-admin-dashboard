import { TestBed } from '@angular/core/testing';
import { InputGroupsComponent } from './input-groups.component';

describe('InputGroupsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [InputGroupsComponent] }).compileComponents());
  it('renders input group examples', () => {
    const fixture = TestBed.createComponent(InputGroupsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.input-group').length).toBe(4);
  });
});
