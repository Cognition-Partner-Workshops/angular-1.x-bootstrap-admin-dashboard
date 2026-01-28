import { Injectable } from '@angular/core';

function mix(color1: string, color2: string, weight: number): string {
  const d2h = (d: number): string => d.toString(16);
  const h2d = (h: string): number => parseInt(h, 16);

  let result = '#';
  for (let i = 1; i < 7; i += 2) {
    const color1Part = h2d(color1.substr(i, 2));
    const color2Part = h2d(color2.substr(i, 2));
    const resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
    result += ('0' + resultPart).slice(-2);
  }
  return result;
}

function tint(color: string, weight: number): string {
  return mix('#ffffff', color, weight);
}

function shade(color: string, weight: number): string {
  return mix('#000000', color, weight);
}

export interface ThemeColors {
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
  dashboard: {
    blueStone: string;
    surfieGreen: string;
    silverTree: string;
    gossip: string;
    white: string;
  };
}

export interface LayoutPaths {
  images: {
    root: string;
    profile: string;
    amMap: string;
    amChart: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  private readonly basic = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa',
  };

  private readonly colorScheme = {
    primary: '#209e91',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656',
  };

  private readonly dashboardColors = {
    blueStone: '#005562',
    surfieGreen: '#0e8174',
    silverTree: '#6eba8c',
    gossip: '#b9f2a1',
    white: '#10c4b5',
  };

  readonly colors: ThemeColors = {
    default: this.basic.default,
    defaultText: this.basic.defaultText,
    border: this.basic.border,
    borderDark: this.basic.borderDark,
    primary: this.colorScheme.primary,
    info: this.colorScheme.info,
    success: this.colorScheme.success,
    warning: this.colorScheme.warning,
    danger: this.colorScheme.danger,
    primaryLight: tint(this.colorScheme.primary, 30),
    infoLight: tint(this.colorScheme.info, 30),
    successLight: tint(this.colorScheme.success, 30),
    warningLight: tint(this.colorScheme.warning, 30),
    dangerLight: tint(this.colorScheme.danger, 30),
    primaryDark: shade(this.colorScheme.primary, 15),
    infoDark: shade(this.colorScheme.info, 15),
    successDark: shade(this.colorScheme.success, 15),
    warningDark: shade(this.colorScheme.warning, 15),
    dangerDark: shade(this.colorScheme.danger, 15),
    dashboard: {
      blueStone: this.dashboardColors.blueStone,
      surfieGreen: this.dashboardColors.surfieGreen,
      silverTree: this.dashboardColors.silverTree,
      gossip: this.dashboardColors.gossip,
      white: this.dashboardColors.white,
    },
  };

  readonly layoutPaths: LayoutPaths = {
    images: {
      root: 'assets/img/',
      profile: 'assets/img/app/profile/',
      amMap: 'assets/img/theme/vendor/ammap/dist/ammap/images/',
      amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
    }
  };
}
