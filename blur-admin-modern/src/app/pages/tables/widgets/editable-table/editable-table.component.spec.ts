import { TestBed } from '@angular/core/testing';
import { EditableTableComponent } from './editable-table.component';

describe('EditableTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [EditableTableComponent] }).compileComponents());

  it('renders twelve rows and edits a cell', () => {
    const fixture = TestBed.createComponent(EditableTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(12);
    (fixture.nativeElement.querySelector('.editable-click') as HTMLElement).click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('Mark');
    input.value = 'Updated';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.editable-click').textContent).toContain('Updated');
  });

  it('paginates the 36 editable rows', () => {
    const fixture = TestBed.createComponent(EditableTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.page-item').length).toBe(7);
    const pageTwo = Array.from(fixture.nativeElement.querySelectorAll('.page-link') as NodeListOf<HTMLElement>).find((link) => link.textContent.trim() === '2') as HTMLElement;
    pageTwo.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody tr td').textContent.trim()).toBe('13');
    expect(fixture.nativeElement.querySelector('tbody tr:last-child td').textContent.trim()).toBe('24');
  });
});
