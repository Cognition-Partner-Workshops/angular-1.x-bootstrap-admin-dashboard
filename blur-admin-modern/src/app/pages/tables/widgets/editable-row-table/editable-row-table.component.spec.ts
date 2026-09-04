import { TestBed } from '@angular/core/testing';
import { EditableRowTableComponent } from './editable-row-table.component';

describe('EditableRowTableComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [EditableRowTableComponent] }).compileComponents());

  it('renders users and resolves legacy status/group labels', () => {
    const fixture = TestBed.createComponent(EditableRowTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(10);
    expect(fixture.nativeElement.textContent).toContain('Esther Vang');
    expect(fixture.nativeElement.textContent).toContain('Buckley Hopkins');
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows[1].textContent).toContain('Not set');
    expect(rows[1].textContent).toContain('vip');
    expect(rows[4].textContent).toContain('admin');
  });

  it('adds, edits, cancels, and deletes rows', () => {
    const fixture = TestBed.createComponent(EditableRowTableComponent);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.add-row-editable-table button') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(12);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'New User';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('New User');
    const edit = fixture.nativeElement.querySelector('.buttons button') as HTMLElement;
    edit.click();
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.form-buttons .btn-default') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Esther Vang');
    const deleteButton = fixture.nativeElement.querySelector('.buttons .btn-danger') as HTMLElement;
    deleteButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(11);
  });

  it('preselects Leah Freeman status and group values while editing', () => {
    const fixture = TestBed.createComponent(EditableRowTableComponent);
    fixture.detectChanges();
    const editButtons = fixture.nativeElement.querySelectorAll('.buttons .btn-primary') as NodeListOf<HTMLElement>;
    editButtons[1].click();
    fixture.detectChanges();
    const selects = fixture.nativeElement.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;
    expect(selects[0].selectedOptions[0].textContent?.trim()).toBe('Excellent');
    expect(selects[1].selectedOptions[0].textContent?.trim()).toBe('user');
  });
});
