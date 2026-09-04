import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private promise?: Promise<void>;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  load(): Promise<void> {
    if (this.promise) return this.promise;

    this.promise = new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps failed to load'));
      this.document.head.appendChild(script);
    });
    return this.promise;
  }
}
