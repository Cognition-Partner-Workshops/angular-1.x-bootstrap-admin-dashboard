import { ChartOptions } from 'chart.js';
import { BaColors } from '../../../theme/ba-config.service';

export const chartPalette = (colors: BaColors): string[] => [
  colors.primary, colors.danger, colors.warning, colors.success, colors.info, colors.default,
  colors.primaryDark, colors.successDark, colors.warningLight, colors.successLight, colors.primaryLight,
];

export function chartJsOptions(colors: BaColors, type: string): ChartOptions {
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 2500 },
    plugins: {
      legend: { display: true, position: 'bottom', labels: { color: colors.defaultText } },
      tooltip: { enabled: type !== 'bar' },
    },
    scales: {
      x: { grid: { color: colors.border }, ticks: { color: colors.defaultText } },
      y: { grid: { color: colors.border }, ticks: { color: colors.defaultText } },
    },
  };
  if (type === 'radar') {
    options.scales = {
      r: {
        grid: { color: colors.border },
        ticks: { color: colors.defaultText, showLabelBackdrop: false, display: false, maxTicksLimit: 5 },
        pointLabels: { color: colors.defaultText },
      },
    };
  }
  return options;
}
