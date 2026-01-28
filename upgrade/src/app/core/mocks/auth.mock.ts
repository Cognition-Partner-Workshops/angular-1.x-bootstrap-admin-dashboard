import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';
import { AuthPort, AuthState, User } from '../ports/auth.port';

const MOCK_USER: User = {
  id: 'user-001',
  email: 'admin@example.com',
  name: 'Admin User',
  roles: ['admin', 'user']
};

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};

@Injectable({ providedIn: 'root' })
export class MockAuthService extends AuthPort {
  private authState$ = new BehaviorSubject<AuthState>(INITIAL_STATE);
  private tokenStorage: string | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(email: string, password: string): Observable<AuthState> {
    const mockToken = 'mock-jwt-token-' + Date.now();
    const newState: AuthState = {
      isAuthenticated: true,
      user: { ...MOCK_USER, email },
      token: mockToken
    };

    return of(newState).pipe(
      delay(500),
      tap(state => {
        this.tokenStorage = state.token;
        this.authState$.next(state);
      })
    );
  }

  logout(): Observable<void> {
    return of(undefined).pipe(
      delay(200),
      tap(() => {
        this.tokenStorage = null;
        this.authState$.next(INITIAL_STATE);
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.authState$.value.user);
  }

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.authState$.value.isAuthenticated);
  }

  getToken(): string | null {
    return this.tokenStorage;
  }
}
