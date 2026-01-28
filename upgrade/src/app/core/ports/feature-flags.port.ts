import { Observable } from 'rxjs';

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export abstract class FeatureFlagsPort {
  abstract isEnabled(flagName: string): Observable<boolean>;
  abstract getFlag(flagName: string): Observable<FeatureFlag | null>;
  abstract getAllFlags(): Observable<FeatureFlag[]>;
  abstract isEnabledSync(flagName: string): boolean;
}
