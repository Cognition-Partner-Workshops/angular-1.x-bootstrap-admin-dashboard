import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeatureFlagsPort, FeatureFlag } from '../ports/feature-flags.port';

const MOCK_FLAGS: FeatureFlag[] = [
  { name: 'new-dashboard', enabled: true, metadata: { rolloutPercentage: 100 } },
  { name: 'dark-mode', enabled: true },
  { name: 'beta-features', enabled: false },
  { name: 'advanced-analytics', enabled: true },
  { name: 'export-pdf', enabled: true },
  { name: 'multi-language', enabled: false }
];

@Injectable({ providedIn: 'root' })
export class MockFeatureFlagsService extends FeatureFlagsPort {
  private flagsMap = new Map(MOCK_FLAGS.map(f => [f.name, f]));

  isEnabled(flagName: string): Observable<boolean> {
    const flag = this.flagsMap.get(flagName);
    return of(flag?.enabled ?? false);
  }

  getFlag(flagName: string): Observable<FeatureFlag | null> {
    return of(this.flagsMap.get(flagName) ?? null);
  }

  getAllFlags(): Observable<FeatureFlag[]> {
    return of(MOCK_FLAGS);
  }

  isEnabledSync(flagName: string): boolean {
    return this.flagsMap.get(flagName)?.enabled ?? false;
  }
}
