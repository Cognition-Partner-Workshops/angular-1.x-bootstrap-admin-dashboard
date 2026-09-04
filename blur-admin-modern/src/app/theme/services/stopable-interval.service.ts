import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface StopableIntervalHandle {
  stop(): void;
}

@Injectable({ providedIn: 'root' })
export class StopableIntervalService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  start(callback: () => void, time: number): StopableIntervalHandle {
    let interval: ReturnType<typeof setInterval> | undefined = setInterval(callback, time);
    const restart = () => {
      if (interval !== undefined) clearInterval(interval);
      interval = setInterval(callback, time);
    };
    const pause = () => {
      if (interval !== undefined) {
        clearInterval(interval);
        interval = undefined;
      }
    };
    const stop = () => {
      pause();
      window.removeEventListener('focus', restart);
      window.removeEventListener('blur', pause);
    };
    window.addEventListener('focus', restart);
    window.addEventListener('blur', pause);
    return { stop };
  }
}
