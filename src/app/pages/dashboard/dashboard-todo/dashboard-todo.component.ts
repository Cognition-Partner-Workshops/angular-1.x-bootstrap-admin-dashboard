import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../../theme/services/theme-config.service';

interface TodoItem {
  text: string;
  color: string;
  done: boolean;
}

@Component({
  selector: 'app-dashboard-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-todo.component.html',
  styleUrl: './dashboard-todo.component.scss',
})
export class DashboardTodoComponent {
  todoList: TodoItem[];
  newTodoText = '';
  private colors: string[];

  constructor(private themeConfig: ThemeConfigService) {
    const dc = this.themeConfig.colors.dashboard;
    this.colors = Object.values(dc);

    const items = [
      'Check me out',
      'Lorem ipsum dolor sit amet, possit denique oportere at his',
      'Ex has semper alterum, expetenda dignissim',
      'Vim an eius ocurreret abhorreant',
      'Simul erroribus ad usu',
      'Ei cum solet appareat, ex est graeci mediocritatem',
      'Get in touch with akveo team',
      'Write email to business cat',
      'Have fun with blur admin',
      'What do you think?',
    ];

    this.todoList = items.map((text) => ({
      text,
      color: this.getRandomColor(),
      done: false,
    }));
  }

  addItem(event?: KeyboardEvent): void {
    if (event && event.key !== 'Enter') return;
    if (!this.newTodoText.trim()) return;

    this.todoList.unshift({
      text: this.newTodoText.trim(),
      color: this.getRandomColor(),
      done: false,
    });
    this.newTodoText = '';
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
