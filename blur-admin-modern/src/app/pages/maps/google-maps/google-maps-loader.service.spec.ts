import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

describe('GoogleMapsLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GoogleMapsLoaderService, { provide: DOCUMENT, useValue: document }],
  }));

  it('adds one script and reuses its promise', () => {
    const service = TestBed.inject(GoogleMapsLoaderService);
    const first = service.load();
    const second = service.load();
    const scripts = Array.from(document.head.querySelectorAll('script')).filter((script) =>
      script.src === 'https://maps.googleapis.com/maps/api/js');
    expect(scripts.length).toBe(1);
    expect(second).toBe(first);
    scripts[0].dispatchEvent(new Event('load'));
  });
});
