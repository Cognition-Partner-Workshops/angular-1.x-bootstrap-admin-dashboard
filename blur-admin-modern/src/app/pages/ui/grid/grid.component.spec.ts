import { TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [GridComponent] }).compileComponents());

  it('creates the grid demo in the Inline Form panel', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance).toBeTruthy();
    expect(element.querySelector('.panel-title')?.textContent?.trim()).toBe('Inline Form');
    expect(element.querySelectorAll('.grid-h').length).toBe(7);
    expect(element.querySelectorAll('.table tbody tr').length).toBe(9);
  });
});
