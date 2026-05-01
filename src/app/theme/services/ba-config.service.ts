import { Injectable } from '@angular/core';

function mix(color1: string, color2: string, weight: number): string {
  function d2h(d: number): string { return d.toString(16); }
  function h2d(h: string): number { return parseInt(h, 16); }
  let result = '#';
  for (let i = 1; i < 7; i += 2) {
    const color1Part = h2d(color1.substr(i, 2));
    const color2Part = h2d(color2.substr(i, 2));
    const resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
    result += ('0' + resultPart).slice(-2);
  }
  return result;
}

function tint(color: string, weight: number): string { return mix('#ffffff', color, weight); }
function shade(color: string, weight: number): string { return mix('#000000', color, weight); }

const basic = {
  default: '#ffffff',
  defaultText: '#666666',
  border: '#dddddd',
  borderDark: '#aaaaaa',
};

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

export interface BaThemeConfig {
  theme: { blur: boolean };
  colors: Record<string, string | Record<string, string>>;
}

@Injectable({ providedIn: 'root' })
export class BaConfigService {
  private conf: BaThemeConfig = {
    theme: { blur: false },
    colors: {
      default: basic.default,
      defaultText: basic.defaultText,
      border: basic.border,
      borderDark: basic.borderDark,
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
      dashboard: {
        blueStone: dashboardColors.blueStone,
        surfieGreen: dashboardColors.surfieGreen,
        silverTree: dashboardColors.silverTree,
        gossip: dashboardColors.gossip,
        white: dashboardColors.white,
      },
    },
  };

  get theme() { return this.conf.theme; }
  get colors() { return this.conf.colors; }

  getColor(name: string): string {
    return (this.conf.colors[name] as string) ?? '';
  }

  getDashboardColor(name: string): string {
    const dashboard = this.conf.colors['dashboard'] as Record<string, string>;
    return dashboard?.[name] ?? '';
  }
}
