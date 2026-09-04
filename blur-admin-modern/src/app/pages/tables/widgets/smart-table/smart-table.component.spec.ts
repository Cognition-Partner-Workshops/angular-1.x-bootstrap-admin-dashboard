import { TestBed } from '@angular/core/testing';
import { SmartTableComponent } from './smart-table.component';

describe('SmartTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [SmartTableComponent] }).compileComponents());

  it('defaults to ten rows sorted by id', () => {
    const fixture = TestBed.createComponent(SmartTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(10);
    expect(fixture.nativeElement.querySelector('tbody tr td').textContent.trim()).toBe('1');
    expect(fixture.nativeElement.querySelector('th').classList).toContain('st-sort-ascent');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.selectedOptions[0].textContent?.trim()).toBe('10');
  });

  it('sorts, filters, changes page size, and paginates', () => {
    const fixture = TestBed.createComponent(SmartTableComponent);
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('thead tr:first-child th');
    (headers[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody tr td:nth-child(2)').textContent.trim()).toBe('Alyce');
    (headers[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody tr td:nth-child(2)').textContent.trim()).toBe('Wilma');
    (headers[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody tr td').textContent.trim()).toBe('1');
    const input = fixture.nativeElement.querySelector('input[placeholder="Search First Name"]') as HTMLInputElement;
    input.value = 'mark';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(2);
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = Array.from(select.options).find((option) => option.textContent?.trim() === '5')?.value ?? '';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('renders ids eleven through twenty on page two', () => {
    const fixture = TestBed.createComponent(SmartTableComponent);
    fixture.detectChanges();
    const pageTwo = Array.from(fixture.nativeElement.querySelectorAll('.page-link') as NodeListOf<HTMLElement>).find((link) => link.textContent.trim() === '2') as HTMLElement;
    pageTwo.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody tr td').textContent.trim()).toBe('11');
    expect(fixture.nativeElement.querySelector('tbody tr:last-child td').textContent.trim()).toBe('20');
  });
});
