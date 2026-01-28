export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export interface PageView {
  path: string;
  title?: string;
  metadata?: Record<string, unknown>;
}

export abstract class AnalyticsPort {
  abstract trackEvent(event: AnalyticsEvent): void;
  abstract trackPageView(pageView: PageView): void;
  abstract setUserId(userId: string | null): void;
  abstract setUserProperties(properties: Record<string, unknown>): void;
}
