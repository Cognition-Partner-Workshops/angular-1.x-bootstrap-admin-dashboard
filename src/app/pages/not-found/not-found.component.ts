import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <h1 class="error-code">404</h1>
      <p class="error-message">The page is not found.</p>
      <a routerLink="/dashboard" class="btn btn-primary">Go to Dashboard</a>
    </div>
  `,
  styles: [`
    :host { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #232634; }
    .not-found-container { text-align: center; color: #fff; }
    .error-code { font-size: 10rem; font-weight: bold; margin: 0; line-height: 1; }
    .error-message { font-size: 1.5rem; margin-bottom: 30px; }
  `],
})
export class NotFoundComponent {}
