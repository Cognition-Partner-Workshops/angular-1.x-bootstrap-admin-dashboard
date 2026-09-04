import { TestBed } from '@angular/core/testing';
import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

describe('GoogleMapsComponent', () => {
  let mapArgs: unknown[];

  beforeEach(async () => {
    mapArgs = [];
    (window as unknown as { google: unknown }).google = {
      maps: {
        Map: function (...args: unknown[]) {
          mapArgs = args;
        },
        MapTypeId: { ROADMAP: 'roadmap' },
      },
    };
    await TestBed.configureTestingModule({
      imports: [GoogleMapsComponent],
      providers: [{ provide: GoogleMapsLoaderService, useValue: { load: () => Promise.resolve() } }],
    }).compileComponents();
  });

  it('creates a map in the panel after loading the API', async () => {
    const fixture = TestBed.createComponent(GoogleMapsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#google-maps')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.widgets .row .col-md-12 ba-panel')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Google Maps');
    expect(mapArgs[0]).toBe(fixture.nativeElement.querySelector('#google-maps'));
    expect(mapArgs[1]).toEqual(jasmine.objectContaining({
      center: { lat: 44.5403, lng: -78.5463 },
      zoom: 8,
    }));
  });

  it('warns instead of throwing when loading fails', async () => {
    const warn = spyOn(console, 'warn');
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [GoogleMapsComponent],
      providers: [{ provide: GoogleMapsLoaderService, useValue: { load: () => Promise.reject(new Error('no API')) } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(GoogleMapsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(warn).toHaveBeenCalled();
  });
});
