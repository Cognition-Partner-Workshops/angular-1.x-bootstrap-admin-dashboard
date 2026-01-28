import { Observable } from 'rxjs';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export abstract class PermissionsPort {
  abstract hasPermission(permissionName: string): Observable<boolean>;
  abstract hasAnyPermission(permissionNames: string[]): Observable<boolean>;
  abstract hasAllPermissions(permissionNames: string[]): Observable<boolean>;
  abstract getUserPermissions(): Observable<Permission[]>;
  abstract canAccess(resource: string, action: string): Observable<boolean>;
}
