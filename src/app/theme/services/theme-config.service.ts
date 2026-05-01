import { Injectable } from '@angular/core';

function mix(color1: string, color2: string, weight: number): string {
  const d2h = (d: number) => d.toString(16);
  const h2d = (h: string) => parseInt(h, 16);
  let result = '#';
  for (let i = 1; i < 7; i += 2) {
    const c1 = h2d(color1.substr(i, 2));
    const c2 = h2d(color2.substr(i, 2));
    const rp = d2h(Math.floor(c2 + (c1 - c2) * (weight / 100.0)));
    result += ('0' + rp).slice(-2);
  }
  return result;
}

export function tint(color: string, weight: number): string {
  return mix('#ffffff', color, weight);
}

export function shade(color: string, weight: number): string {
  return mix('#000000', color, weight);
}

export function hexToRGB(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const colorScheme = {
  primary: '#209e91',
  info: '#2dacd1',
  success: '#90b900',
  warning: '#dfb81c',
  danger: '#e85656',
};

const dashboardColors = {
  blueStone: '#005562',
  surfieGreen: '#0e8174',
  silverTree: '#6eba8c',
  gossip: '#b9f2a1',
  white: '#10c4b5',
};

@Injectable({ providedIn: 'root' })
export class ThemeConfigService {
  readonly theme = { blur: false };

  readonly colors = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa',

    primary: colorScheme.primary,
    info: colorScheme.info,
    success: colorScheme.success,
    warning: colorScheme.warning,
    danger: colorScheme.danger,

    primaryLight: tint(colorScheme.primary, 30),
    infoLight: tint(colorScheme.info, 30),
    successLight: tint(colorScheme.success, 30),
    warningLight: tint(colorScheme.warning, 30),
    dangerLight: tint(colorScheme.danger, 30),

    primaryDark: shade(colorScheme.primary, 15),
    infoDark: shade(colorScheme.info, 15),
    successDark: shade(colorScheme.success, 15),
    warningDark: shade(colorScheme.warning, 15),
    dangerDark: shade(colorScheme.danger, 15),

    dashboard: { ...dashboardColors },
  };

  readonly layoutSizes = {
    resWidthCollapseSidebar: 1200,
    resWidthHideSidebar: 500,
  };

  readonly layoutPaths = {
    images: {
      root: 'assets/img/',
      profile: 'assets/img/app/profile/',
    },
  };
}
