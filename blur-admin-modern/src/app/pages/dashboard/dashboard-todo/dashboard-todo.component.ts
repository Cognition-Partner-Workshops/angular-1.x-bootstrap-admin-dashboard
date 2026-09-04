import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaConfigService } from '../../../theme';

export interface TodoItem {
  text: string;
  color: string;
  checked: boolean;
  deleted: boolean;
  active: boolean;
}

@Component({
  selector: 'dashboard-todo',
  standalone: true,
  imports: [FormsModule, CdkDropList, CdkDrag],
  templateUrl: './dashboard-todo.component.html',
  styleUrl: './dashboard-todo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardTodoComponent {
  private readonly config = inject(BaConfigService);
  private readonly colors = Object.values(this.config.colors.dashboard);

  readonly transparent = this.config.theme.blur;
  newTodoText = '';

  readonly todoList = signal<TodoItem[]>([
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
  ].map((text) => this.createItem(text)));

  addToDoItem(event?: KeyboardEvent, clickPlus = false): void {
    if (clickPlus || event?.key === 'Enter') {
      this.todoList.update((list) => [this.createItem(this.newTodoText), ...list]);
      this.newTodoText = '';
    }
  }

  drop(event: CdkDragDrop<TodoItem[]>): void {
    this.todoList.update((list) => {
      const visible = list.filter((item) => !item.deleted);
      moveItemInArray(visible, event.previousIndex, event.currentIndex);
      return [...visible, ...list.filter((item) => item.deleted)];
    });
  }

  private createItem(text: string): TodoItem {
    return { text, color: this.getRandomColor(), checked: false, deleted: false, active: false };
  }

  private getRandomColor(): string {
    const i = Math.floor(Math.random() * (this.colors.length - 1));
    return this.colors[i];
  }
}
