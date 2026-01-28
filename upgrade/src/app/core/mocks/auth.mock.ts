import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';
import { AuthPort, AuthState, User } from '../ports/auth.port';

export interface MockUserProfile {
  user: User;
  password: string;
}

export const MOCK_USERS: Record<string, MockUserProfile> = {
  'admin@example.com': {
    user: {
      id: 'user-001',
      email: 'admin@example.com',
      name: 'Admin User',
      roles: ['admin', 'user']
    },
    password: 'admin123'
  },
  'editor@example.com': {
    user: {
      id: 'user-002',
      email: 'editor@example.com',
      name: 'Editor User',
      roles: ['editor', 'user']
    },
    password: 'editor123'
  },
  'viewer@example.com': {
    user: {
      id: 'user-003',
      email: 'viewer@example.com',
      name: 'Viewer User',
      roles: ['viewer']
    },
    password: 'viewer123'
  },
  'guest@example.com': {
    user: {
      id: 'user-004',
      email: 'guest@example.com',
      name: 'Guest User',
      roles: ['guest']
    },
    password: 'guest123'
  }
};

const DEFAULT_USER = MOCK_USERS['admin@example.com'].user;

const INITIAL_STATE: AuthState = {
  isAuthenticated: true,
  user: DEFAULT_USER,
  token: 'mock-jwt-token-default'
};

@Injectable({ providedIn: 'root' })
export class MockAuthService extends AuthPort {
  private authState$ = new BehaviorSubject<AuthState>(INITIAL_STATE);
  private tokenStorage: string | null = null;

  login(email: string, password: string): Observable<AuthState> {
    const userProfile = MOCK_USERS[email];
    
    if (!userProfile || userProfile.password !== password) {
      const errorState: AuthState = {
        isAuthenticated: false,
        user: null,
        token: null
      };
      return of(errorState).pipe(delay(500));
    }

    const mockToken = 'mock-jwt-token-' + Date.now();
    const newState: AuthState = {
      isAuthenticated: true,
      user: userProfile.user,
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
