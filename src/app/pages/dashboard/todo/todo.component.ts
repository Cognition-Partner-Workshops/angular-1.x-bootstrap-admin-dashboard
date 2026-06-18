import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-container">
      <div class="add-todo">
        <input type="text" class="form-control" placeholder="Add new task..."
               [(ngModel)]="newTask" (keyup.enter)="addTask()">
        <button class="btn btn-primary btn-sm" (click)="addTask()">
          <i class="fa fa-plus"></i>
        </button>
      </div>
      <ul class="todo-list">
        @for (item of todos(); track $index) {
          <li [class.done]="item.done">
            <label class="todo-checkbox">
              <input type="checkbox" [(ngModel)]="item.done">
              <span class="todo-text">{{ item.text }}</span>
            </label>
            <button class="btn-remove" (click)="removeTask($index)">
              <i class="fa fa-trash-o"></i>
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .add-todo {
      display: flex; gap: 8px; margin-bottom: 16px;
      .form-control { flex: 1; }
    }
    .todo-list {
      list-style: none; padding: 0; margin: 0;
      li {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 0; border-bottom: 1px solid #f0f0f0;
        &.done .todo-text { text-decoration: line-through; color: #ccc; }
      }
    }
    .todo-checkbox {
      display: flex; align-items: center; gap: 10px; cursor: pointer; margin: 0;
      input { margin-right: 4px; }
    }
    .todo-text { font-size: 14px; color: #666; }
    .btn-remove {
      background: none; border: none; color: #999; cursor: pointer;
      &:hover { color: #e85656; }
    }
  `],
})
export class TodoComponent {
  newTask = '';
  todos = signal<TodoItem[]>([
    { text: 'Meeting with CEO', done: false },
    { text: 'Pair programming session', done: true },
    { text: 'Write migration documentation', done: false },
    { text: 'Review pull requests', done: false },
    { text: 'Update project dependencies', done: true },
    { text: 'Design new landing page', done: false },
  ]);

  addTask(): void {
    if (this.newTask.trim()) {
      this.todos.update(items => [...items, { text: this.newTask.trim(), done: false }]);
      this.newTask = '';
    }
  }

  removeTask(index: number): void {
    this.todos.update(items => items.filter((_, i) => i !== index));
  }
}
