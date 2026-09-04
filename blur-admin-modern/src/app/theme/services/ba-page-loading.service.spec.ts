import { BaPageLoadingService } from './ba-page-loading.service';

describe('BaPageLoadingService', () => {
  it('creates with loading false', () => {
    expect(new BaPageLoadingService().pageFinishedLoading()).toBeFalse();
  });

  it('exposes writable signal state', () => {
    const service = new BaPageLoadingService();
    service.pageFinishedLoading.set(true);
    expect(service.pageFinishedLoading()).toBeTrue();
  });
});
