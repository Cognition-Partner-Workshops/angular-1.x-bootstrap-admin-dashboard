import { fakeAsync, tick } from '@angular/core/testing';
import { PreloaderService } from './preloader.service';

describe('PreloaderService', () => {
  it('creates', () => {
    expect(new PreloaderService()).toBeTruthy();
  });

  it('resolves immediately when AmCharts is unavailable', fakeAsync(() => {
    const service = new PreloaderService();
    let loaded = false;
    service.loadAmCharts().then(() => loaded = true);
    tick();
    expect(loaded).toBeTrue();
  }));
});
