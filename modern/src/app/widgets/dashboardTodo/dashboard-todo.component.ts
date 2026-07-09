import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

interface TodoItem {
  text: string;
  color: string;
  checked: boolean;
}

/**
 * Modern standalone port of the legacy AngularJS `dashboardTodo` directive
 * (src/app/pages/dashboard/dashboardTodo). An interactive "To Do List":
 * add items (Enter or the + button prepends), toggle done, remove, and
 * reorder by drag-and-drop (legacy jQuery ui-sortable -> @angular/cdk).
 */
@Component({
  selector: 'app-dashboard-todo',
  standalone: true,
  imports: [FormsModule, CdkDropList, CdkDrag],
  templateUrl: './dashboard-todo.component.html',
  styleUrl: './dashboard-todo.component.scss',
})
export class DashboardTodoComponent {
  /** Dashboard palette used for the random per-item colored "mark". */
  private readonly dashboardColors = [
    '#005562',
    '#0e8174',
    '#6eba8c',
    '#b9f2a1',
    '#10c4b5',
  ];

  newTodoText = '';

  todoList: TodoItem[] = [
    { text: 'Check me out' },
    {
      text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro',
    },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
    { text: 'Simul erroribus ad usu' },
    { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
    { text: 'Get in touch with akveo team' },
    { text: 'Write email to business cat' },
    { text: 'Have fun with blur admin' },
    { text: 'What do you think?' },
  ].map((item) => ({ ...item, color: this.getRandomColor(), checked: false }));

  private getRandomColor(): string {
    const i = Math.floor(Math.random() * (this.dashboardColors.length - 1));
    return this.dashboardColors[i];
  }

  addToDoItem(): void {
    const text = this.newTodoText;
    this.todoList.unshift({ text, color: this.getRandomColor(), checked: false });
    this.newTodoText = '';
  }

  removeToDoItem(item: TodoItem): void {
    this.todoList = this.todoList.filter((i) => i !== item);
  }

  drop(event: CdkDragDrop<TodoItem[]>): void {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  }
}
