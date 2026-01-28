import { Injectable } from '@angular/core';
import { AnalyticsPort, AnalyticsEvent, PageView } from '../ports/analytics.port';

@Injectable({ providedIn: 'root' })
export class MockAnalyticsService extends AnalyticsPort {
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];
  private userId: string | null = null;
  private userProperties: Record<string, unknown> = {};

  trackEvent(event: AnalyticsEvent): void {
    console.log('[MockAnalytics] Event:', event);
    this.events.push(event);
  }

  trackPageView(pageView: PageView): void {
    console.log('[MockAnalytics] PageView:', pageView);
    this.pageViews.push(pageView);
  }

  setUserId(userId: string | null): void {
    console.log('[MockAnalytics] UserId:', userId);
    this.userId = userId;
  }

  setUserProperties(properties: Record<string, unknown>): void {
    console.log('[MockAnalytics] UserProperties:', properties);
    this.userProperties = { ...this.userProperties, ...properties };
  }

  getTrackedEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getTrackedPageViews(): PageView[] {
    return [...this.pageViews];
  }

  clearTracking(): void {
    this.events = [];
    this.pageViews = [];
  }
}
