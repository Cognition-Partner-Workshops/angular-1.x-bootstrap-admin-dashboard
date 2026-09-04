import { TestBed } from '@angular/core/testing';
import { SelectsComponent } from './selects.component';

describe('SelectsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [SelectsComponent] }).compileComponents());
  it('renders seven ng-select demos', () => {
    const fixture = TestBed.createComponent(SelectsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ng-select').length).toBe(7);
  });
});
