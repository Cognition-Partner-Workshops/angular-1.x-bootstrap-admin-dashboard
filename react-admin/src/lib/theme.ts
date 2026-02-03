export const colors = {
  default: "#ffffff",
  defaultText: "#666666",
  border: "#dddddd",
  borderDark: "#aaaaaa",

  primary: "#209e91",
  info: "#2dacd1",
  success: "#90b900",
  warning: "#dfb81c",
  danger: "#e85656",

  primaryLight: "#4db8ad",
  infoLight: "#57bdd9",
  successLight: "#a6c733",
  warningLight: "#e5c649",
  dangerLight: "#ed7878",

  primaryDark: "#1b867b",
  infoDark: "#2692b2",
  successDark: "#7a9d00",
  warningDark: "#bd9c18",
  dangerDark: "#c54949",

  dashboard: {
    blueStone: "#005562",
    surfieGreen: "#0e8174",
    silverTree: "#6eba8c",
    gossip: "#b9f2a1",
    white: "#10c4b5",
  },
};

export const layoutSizes = {
  resWidthCollapseSidebar: 1200,
  resWidthHideSidebar: 500,
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function tint(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const r = Math.round(rgb.r + (255 - rgb.r) * (percent / 100));
  const g = Math.round(rgb.g + (255 - rgb.g) * (percent / 100));
  const b = Math.round(rgb.b + (255 - rgb.b) * (percent / 100));
  
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function shade(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const r = Math.round(rgb.r * (1 - percent / 100));
  const g = Math.round(rgb.g * (1 - percent / 100));
  const b = Math.round(rgb.b * (1 - percent / 100));
  
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
