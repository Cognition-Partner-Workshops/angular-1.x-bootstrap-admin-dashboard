import { Provider } from '@angular/core';
import { AuthPort } from './ports/auth.port';
import { PermissionsPort } from './ports/permissions.port';
import { FeatureFlagsPort } from './ports/feature-flags.port';
import { AnalyticsPort } from './ports/analytics.port';
import { DataPort } from './ports/data.port';
import { MockAuthService } from './mocks/auth.mock';
import { MockPermissionsService } from './mocks/permissions.mock';
import { MockFeatureFlagsService } from './mocks/feature-flags.mock';
import { MockAnalyticsService } from './mocks/analytics.mock';
import { MockDataService } from './mocks/data.mock';

export const CORE_PROVIDERS: Provider[] = [
  { provide: AuthPort, useClass: MockAuthService },
  { provide: PermissionsPort, useClass: MockPermissionsService },
  { provide: FeatureFlagsPort, useClass: MockFeatureFlagsService },
  { provide: AnalyticsPort, useClass: MockAnalyticsService },
  { provide: DataPort, useClass: MockDataService }
];
