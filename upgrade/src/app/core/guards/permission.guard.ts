import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { PermissionsPort } from '../ports/permissions.port';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  const permissionsPort = inject(PermissionsPort);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as string | undefined;
  const requiredPermissions = route.data['permissions'] as string[] | undefined;
  const requireAll = route.data['requireAllPermissions'] as boolean | undefined;

  if (!requiredPermission && !requiredPermissions) {
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  if (requiredPermission) {
    return permissionsPort.hasPermission(requiredPermission).pipe(
      take(1),
      map(hasPermission => {
        if (hasPermission) {
          return true;
        }
        return router.createUrlTree(['/upgrade/unauthorized']);
      })
    );
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const checkFn = requireAll
      ? permissionsPort.hasAllPermissions(requiredPermissions)
      : permissionsPort.hasAnyPermission(requiredPermissions);

    return checkFn.pipe(
      take(1),
      map(hasPermission => {
        if (hasPermission) {
          return true;
        }
        return router.createUrlTree(['/upgrade/unauthorized']);
      })
    );
  }

  return new Observable(observer => {
    observer.next(true);
    observer.complete();
  });
};

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  const permissionsPort = inject(PermissionsPort);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  return permissionsPort.hasAnyPermission(requiredRoles.map(role => `role.${role}`)).pipe(
    take(1),
    map(hasRole => {
      if (hasRole) {
        return true;
      }
      return router.createUrlTree(['/upgrade/unauthorized']);
    })
  );
};
