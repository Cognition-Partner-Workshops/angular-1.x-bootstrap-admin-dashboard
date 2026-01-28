import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthPort } from '../ports/auth.port';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authPort = inject(AuthPort);
  const router = inject(Router);

  return authPort.getAuthState().pipe(
    take(1),
    map(state => {
      if (state.isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/upgrade/login']);
    })
  );
};

export const guestGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authPort = inject(AuthPort);
  const router = inject(Router);

  return authPort.getAuthState().pipe(
    take(1),
    map(state => {
      if (!state.isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/upgrade/dashboard']);
    })
  );
};
