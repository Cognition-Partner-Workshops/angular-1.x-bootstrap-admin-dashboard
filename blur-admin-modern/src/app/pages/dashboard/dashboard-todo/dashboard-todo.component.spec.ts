import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaConfigService } from '../../../theme';
import { DashboardTodoComponent, TodoItem } from './dashboard-todo.component';

const LEGACY_TODOS = [
  'Check me out',
  'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro',
  'Ex has semper alterum, expetenda dignissim',
  'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.',
  'Simul erroribus ad usu',
  'Ei cum solet appareat, ex est graeci mediocritatem',
  'Get in touch with akveo team',
  'Write email to business cat',
  'Have fun with blur admin',
  'What do you think?',
];

describe('DashboardTodoComponent', () => {
  let fixture: ComponentFixture<DashboardTodoComponent>;
  let component: DashboardTodoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardTodoComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const visibleTexts = () => Array.from(fixture.nativeElement.querySelectorAll('li .cut-with-dots')).map((s) => (s as HTMLElement).textContent?.trim());

  it('creates', () => expect(component).toBeTruthy());

  it('renders the ten legacy todo items with a dashboard colour mark and checkbox', () => {
    expect(visibleTexts()).toEqual(LEGACY_TODOS);
    const colors = Object.values(TestBed.inject(BaConfigService).colors.dashboard);
    for (const item of component.todoList()) {
      expect(colors).toContain(item.color);
      expect(item.checked).toBeFalse();
      expect(item.deleted).toBeFalse();
    }
    expect(fixture.nativeElement.querySelectorAll('li i.mark').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('li input[type="checkbox"]').length).toBe(10);
    expect(fixture.nativeElement.querySelector('input.task-todo')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.add-item-icon')).toBeTruthy();
  });

  it('adds a new item to the top on Enter and clears the input', () => {
    component.newTodoText = 'Write specs';
    component.addToDoItem({ key: 'a' } as KeyboardEvent);
    expect(component.todoList().length).toBe(10);
    component.addToDoItem({ key: 'Enter' } as KeyboardEvent);
    fixture.detectChanges();
    expect(component.todoList().length).toBe(11);
    expect(component.todoList()[0].text).toBe('Write specs');
    expect(component.newTodoText).toBe('');
    expect(visibleTexts()[0]).toBe('Write specs');
  });

  it('adds a new item when the plus icon is clicked', () => {
    component.newTodoText = 'Click plus';
    (fixture.nativeElement.querySelector('.add-item-icon') as HTMLElement).click();
    fixture.detectChanges();
    expect(visibleTexts()[0]).toBe('Click plus');
  });

  it('marks items as done via the checkbox', () => {
    const checkbox = fixture.nativeElement.querySelector('li input[type="checkbox"]') as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();
    expect(component.todoList()[0].checked).toBeTrue();
    expect(fixture.nativeElement.querySelector('li')?.classList).toContain('checked');
  });

  it('removes items via the close icon (soft delete)', () => {
    (fixture.nativeElement.querySelector('li .remove-todo') as HTMLElement).click();
    fixture.detectChanges();
    expect(component.todoList()[0].deleted).toBeTrue();
    expect(visibleTexts().length).toBe(9);
    expect(visibleTexts()[0]).toBe(LEGACY_TODOS[1]);
  });

  it('reorders visible items on drop', () => {
    component.drop({ previousIndex: 0, currentIndex: 2 } as CdkDragDrop<TodoItem[]>);
    fixture.detectChanges();
    expect(visibleTexts().slice(0, 3)).toEqual([LEGACY_TODOS[1], LEGACY_TODOS[2], LEGACY_TODOS[0]]);
    expect(fixture.nativeElement.querySelector('ul.todo-list.cdk-drop-list')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('li.cdk-drag').length).toBe(10);
  });
});
