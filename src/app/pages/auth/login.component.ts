import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-block">
      <h1>Sign In to Blur Admin</h1>
      <form>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="email">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" placeholder="password">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="rememberMe">
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
        <button type="button" class="btn btn-primary w-100" routerLink="/dashboard">Sign In</button>
        <div class="mt-3 text-center">
          <a routerLink="/auth/register">Don't have an account? Sign Up</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #232634; }
    .auth-block { background: #fff; padding: 40px; border-radius: 5px; width: 400px; max-width: 90%; }
    .auth-block h1 { font-size: 1.5rem; margin-bottom: 30px; text-align: center; }
  `],
})
export class LoginComponent {}
