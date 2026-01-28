import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PermissionsPort, Permission } from '../ports/permissions.port';

const MOCK_PERMISSIONS: Permission[] = [
  { id: 'perm-001', name: 'dashboard.view', description: 'View dashboard' },
  { id: 'perm-002', name: 'dashboard.edit', description: 'Edit dashboard' },
  { id: 'perm-003', name: 'users.view', description: 'View users' },
  { id: 'perm-004', name: 'users.create', description: 'Create users' },
  { id: 'perm-005', name: 'users.edit', description: 'Edit users' },
  { id: 'perm-006', name: 'users.delete', description: 'Delete users' },
  { id: 'perm-007', name: 'reports.view', description: 'View reports' },
  { id: 'perm-008', name: 'reports.export', description: 'Export reports' },
  { id: 'perm-009', name: 'settings.view', description: 'View settings' },
  { id: 'perm-010', name: 'settings.edit', description: 'Edit settings' }
];

@Injectable({ providedIn: 'root' })
export class MockPermissionsService extends PermissionsPort {
  private userPermissions = new Set(MOCK_PERMISSIONS.map(p => p.name));

  hasPermission(permissionName: string): Observable<boolean> {
    return of(this.userPermissions.has(permissionName));
  }

  hasAnyPermission(permissionNames: string[]): Observable<boolean> {
    return of(permissionNames.some(name => this.userPermissions.has(name)));
  }

  hasAllPermissions(permissionNames: string[]): Observable<boolean> {
    return of(permissionNames.every(name => this.userPermissions.has(name)));
  }

  getUserPermissions(): Observable<Permission[]> {
    return of(MOCK_PERMISSIONS);
  }

  canAccess(resource: string, action: string): Observable<boolean> {
    const permissionName = `${resource}.${action}`;
    return this.hasPermission(permissionName);
  }
}
