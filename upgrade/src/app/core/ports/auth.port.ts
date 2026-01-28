import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export abstract class AuthPort {
  abstract login(email: string, password: string): Observable<AuthState>;
  abstract logout(): Observable<void>;
  abstract getCurrentUser(): Observable<User | null>;
  abstract getAuthState(): Observable<AuthState>;
  abstract isAuthenticated(): Observable<boolean>;
  abstract getToken(): string | null;
}
