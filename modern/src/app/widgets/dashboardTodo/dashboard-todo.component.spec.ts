import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTodoComponent } from './dashboard-todo.component';

describe('DashboardTodoComponent', () => {
  let fixture: ComponentFixture<DashboardTodoComponent>;
  let component: DashboardTodoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTodoComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should seed ten todo items', () => {
    expect(component.todoList.length).toBe(10);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.todo-item').length).toBe(10);
    expect(el.textContent).toContain('Check me out');
  });

  it('should prepend a new item via addToDoItem', () => {
    component.newTodoText = 'New QA task';
    component.addToDoItem();
    fixture.detectChanges();
    expect(component.todoList.length).toBe(11);
    expect(component.todoList[0].text).toBe('New QA task');
    expect(component.newTodoText).toBe('');
  });

  it('should remove an item via removeToDoItem', () => {
    const target = component.todoList[0];
    component.removeToDoItem(target);
    fixture.detectChanges();
    expect(component.todoList.length).toBe(9);
    expect(component.todoList).not.toContain(target);
  });

  it('should reorder items on drop', () => {
    const first = component.todoList[0];
    const second = component.todoList[1];
    component.drop({ previousIndex: 0, currentIndex: 1 } as any);
    expect(component.todoList[0]).toBe(second);
    expect(component.todoList[1]).toBe(first);
  });
});
