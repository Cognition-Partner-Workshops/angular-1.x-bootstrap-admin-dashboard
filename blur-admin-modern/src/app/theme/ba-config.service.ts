import { Injectable } from '@angular/core';
import { shade, tint } from './color-helper';

export interface BaTheme {
  blur: boolean;
}

export interface BaDashboardColors {
  blueStone: string;
  surfieGreen: string;
  silverTree: string;
  gossip: string;
  white: string;
}

export interface BaColors {
  default: string;
  defaultText: string;
  border: string;
  borderDark: string;
  primary: string;
  info: string;
  success: string;
  warning: string;
  danger: string;
  primaryLight: string;
  infoLight: string;
  successLight: string;
  warningLight: string;
  dangerLight: string;
  primaryDark: string;
  infoDark: string;
  successDark: string;
  warningDark: string;
  dangerDark: string;
  dashboard: BaDashboardColors;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const merge = <T extends object>(target: T, source: DeepPartial<T>): T => {
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const current = (target as Record<string, unknown>)[key];
      (target as Record<string, unknown>)[key] = merge(
        (current && typeof current === 'object' ? current : {}) as object,
        value as DeepPartial<object>,
      );
    } else if (value !== undefined) {
      (target as Record<string, unknown>)[key] = value;
    }
  });
  return target;
};

@Injectable({ providedIn: 'root' })
export class BaConfigService {
  theme: BaTheme = { blur: false };
  colors: BaColors = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa',
    primary: '#209e91',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656',
    primaryLight: tint('#209e91', 30),
    infoLight: tint('#2dacd1', 30),
    successLight: tint('#90b900', 30),
    warningLight: tint('#dfb81c', 30),
    dangerLight: tint('#e85656', 30),
    primaryDark: shade('#209e91', 15),
    infoDark: shade('#2dacd1', 15),
    successDark: shade('#90b900', 15),
    warningDark: shade('#dfb81c', 15),
    dangerDark: shade('#e85656', 15),
    dashboard: {
      blueStone: '#005562',
      surfieGreen: '#0e8174',
      silverTree: '#6eba8c',
      gossip: '#b9f2a1',
      white: '#10c4b5',
    },
  };

  changeTheme(theme: Partial<BaTheme>): void {
    merge(this.theme, theme);
  }

  changeColors(colors: DeepPartial<BaColors>): void {
    merge(this.colors, colors);
  }
}
