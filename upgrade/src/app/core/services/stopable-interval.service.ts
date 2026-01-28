import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';

interface IntervalEntry {
  callback: () => void;
  time: number;
  intervalId: ReturnType<typeof setInterval> | null;
}

/**
 * StopableIntervalService - Angular port of legacy stopableInterval service
 * Creates intervals that pause when the browser tab loses focus and resume when it regains focus.
 * This is useful for animations that should not run in the background.
 */
@Injectable({
  providedIn: 'root',
})
export class StopableIntervalService implements OnDestroy {
  private readonly ngZone = inject(NgZone);
  private intervals = new Map<number, IntervalEntry>();
  private nextId = 0;
  private focusHandler: (() => void) | null = null;
  private blurHandler: (() => void) | null = null;

  constructor() {
    this.setupWindowListeners();
  }

  private setupWindowListeners(): void {
    if (typeof window === 'undefined') return;

    this.focusHandler = () => {
      this.intervals.forEach((interval) => {
        if (interval.intervalId === null) {
          interval.intervalId = this.createInterval(interval.callback, interval.time);
        }
      });
    };

    this.blurHandler = () => {
      this.intervals.forEach((interval) => {
        if (interval.intervalId !== null) {
          clearInterval(interval.intervalId);
          interval.intervalId = null;
        }
      });
    };

    window.addEventListener('focus', this.focusHandler);
    window.addEventListener('blur', this.blurHandler);
  }

  private createInterval(callback: () => void, time: number): ReturnType<typeof setInterval> {
    return this.ngZone.runOutsideAngular(() => {
      return setInterval(() => {
        this.ngZone.run(() => {
          callback();
        });
      }, time);
    });
  }

  /**
   * Start a new stopable interval
   * @param callback Function to call on each interval
   * @param time Interval time in milliseconds
   * @returns Interval ID that can be used to stop the interval
   */
  start(callback: () => void, time: number): number {
    const id = this.nextId++;
    const intervalId = this.createInterval(callback, time);

    this.intervals.set(id, {
      callback,
      time,
      intervalId,
    });

    return id;
  }

  /**
   * Stop a specific interval
   * @param id Interval ID returned from start()
   */
  stop(id: number): void {
    const interval = this.intervals.get(id);
    if (interval) {
      if (interval.intervalId !== null) {
        clearInterval(interval.intervalId);
      }
      this.intervals.delete(id);
    }
  }

  /**
   * Stop all intervals
   */
  stopAll(): void {
    this.intervals.forEach((interval) => {
      if (interval.intervalId !== null) {
        clearInterval(interval.intervalId);
      }
    });
    this.intervals.clear();
  }

  ngOnDestroy(): void {
    this.stopAll();
    if (typeof window !== 'undefined') {
      if (this.focusHandler) {
        window.removeEventListener('focus', this.focusHandler);
      }
      if (this.blurHandler) {
        window.removeEventListener('blur', this.blurHandler);
      }
    }
  }
}
