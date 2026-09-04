import { Injectable } from '@angular/core';

declare global {
  interface Window {
    AmCharts?: { ready(cb: () => void): void };
  }
}

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  loadImg(src: string): Promise<void> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = src;
    });
  }

  loadAmCharts(): Promise<void> {
    return new Promise((resolve) => {
      if (window.AmCharts?.ready) {
        window.AmCharts.ready(resolve);
      } else {
        resolve();
      }
    });
  }
}
