import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-block">
      <h1>Sign Up for Blur Admin</h1>
      <form>
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" placeholder="Full Name">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="email">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" placeholder="password">
        </div>
        <div class="mb-3">
          <label class="form-label">Repeat Password</label>
          <input type="password" class="form-control" placeholder="confirm password">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="agreeTerms">
          <label class="form-check-label" for="agreeTerms">I agree to the Terms of Service</label>
        </div>
        <button type="button" class="btn btn-primary w-100" routerLink="/dashboard">Sign Up</button>
        <div class="mt-3 text-center">
          <a routerLink="/auth/login">Already have an account? Sign In</a>
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
export class RegisterComponent {}
