import { TestBed } from '@angular/core/testing';
import * as am5 from '@amcharts/amcharts5';
import { BaConfigService } from '../../../theme';
import { BlurTheme } from './blur.theme';

describe('BlurTheme', () => {
  it('creates from the configured palette', () => {
    const root = am5.Root.new(document.createElement('div'));
    const theme = BlurTheme.newWithConfig(root, TestBed.inject(BaConfigService));
    expect(theme).toBeTruthy();
    root.dispose();
  });
});
