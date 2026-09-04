import { TestBed } from '@angular/core/testing';
import { BasicTablesComponent } from './basic-tables.component';

describe('BasicTablesComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [BasicTablesComponent] }).compileComponents());
  it('renders the six basic table panels in order', () => {
    const fixture = TestBed.createComponent(BasicTablesComponent);
    fixture.detectChanges();
    expect(Array.from(fixture.nativeElement.querySelectorAll('.panel-title') as NodeListOf<HTMLElement>).map((title) => title.textContent.trim())).toEqual([
      'Hover Rows', 'Bordered Table', 'Condensed Table', 'Striped Rows', 'Contextual Table', 'Responsive Table',
    ]);
    expect(fixture.nativeElement.querySelector('app-hover-rows')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-bordered-table')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-condensed-table')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-striped-rows')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-contextual-table')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-responsive-table')).toBeTruthy();
  });
});
