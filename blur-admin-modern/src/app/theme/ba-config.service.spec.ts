import { BaConfigService } from './ba-config.service';

describe('BaConfigService', () => {
  it('creates', () => {
    expect(new BaConfigService()).toBeTruthy();
  });

  it('initializes the palette and recursively merges changes', () => {
    const service = new BaConfigService();
    expect(service.colors.primaryLight).toBe('#62bbb2');
    service.changeColors({ dashboard: { white: '#fff' } });
    service.changeTheme({ blur: true });
    expect(service.colors.dashboard.white).toBe('#fff');
    expect(service.theme.blur).toBeTrue();
  });
});
