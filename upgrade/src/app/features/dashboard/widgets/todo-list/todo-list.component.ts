import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  text: string;
  color: string;
  checked: boolean;
  deleted: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTodoText = '';

  private dashboardColors = [
    '#ffffff', '#4a4a4a', '#00a5a8', '#66bb6a', '#c5e1a5', '#209e91'
  ];

  ngOnInit(): void {
    const initialTodos = [
      'Check me out',
      'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro',
      'Ex has semper alterum, expetenda dignissim',
      'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.',
      'Simul erroribus ad usu',
      'Ei cum solet appareat, ex est graeci mediocritatem',
      'Get in touch with akveo team',
      'Write email to business cat',
      'Have fun with blur admin',
      'What do you think?'
    ];

    this.todoList = initialTodos.map(text => ({
      text,
      color: this.getRandomColor(),
      checked: false,
      deleted: false
    }));
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * (this.dashboardColors.length - 1));
    return this.dashboardColors[index];
  }

  addTodoItem(event?: KeyboardEvent, clickPlus = false): void {
    if (clickPlus || (event && event.key === 'Enter')) {
      if (this.newTodoText.trim()) {
        this.todoList.unshift({
          text: this.newTodoText,
          color: this.getRandomColor(),
          checked: false,
          deleted: false
        });
        this.newTodoText = '';
      }
    }
  }

  deleteTodoItem(item: TodoItem): void {
    item.deleted = true;
  }

  get visibleTodos(): TodoItem[] {
    return this.todoList.filter(item => !item.deleted);
  }
}
