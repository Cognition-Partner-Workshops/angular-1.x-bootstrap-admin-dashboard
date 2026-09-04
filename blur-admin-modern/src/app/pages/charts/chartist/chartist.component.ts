import { Component, inject } from '@angular/core';
import { BaConfigService, BaPanelComponent } from '../../../theme';
import { ChartistDirective } from './chartist.directive';

@Component({
  selector: 'app-chartist',
  standalone: true,
  imports: [BaPanelComponent, ChartistDirective],
  templateUrl: './chartist.component.html',
})
export class ChartistComponent {
  private readonly config = inject(BaConfigService);
  readonly simpleLineData = { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], series: [[20, 20, 12, 45, 50], [10, 45, 30, 14, 12], [34, 12, 12, 40, 50], [10, 43, 25, 22, 16], [3, 6, 30, 33, 43]] };
  readonly simpleLineOptions = { color: this.config.colors.defaultText, fullWidth: true, height: '300px', chartPadding: { right: 40 } };
  readonly areaLineData = { labels: [1, 2, 3, 4, 5, 6, 7, 8], series: [[5, 9, 7, 8, 5, 3, 5, 4]] };
  readonly areaLineOptions = { fullWidth: true, height: '300px', low: 0, showArea: true };
  readonly biLineData = { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], series: [[1, 2, 3, 1, -2, 0, 1], [-2, -1, -2, -1, -2.5, -1, -2], [0, 0, 0, 1, 2, 2.5, 2], [2.5, 2, 1, 0.5, 1, 0.5, -1]] };
  readonly biLineOptions = { height: '300px', high: 3, low: -3, showArea: true, showLine: false, showPoint: false, fullWidth: true, axisX: { showGrid: false } };
  readonly simpleBarData = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], series: [[15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8], [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]] };
  readonly simpleBarOptions = { fullWidth: true, height: '300px' };
  readonly multiBarData = { labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'], series: [[5, 4, 3, 7], [3, 2, 9, 5], [1, 5, 8, 4], [2, 3, 4, 6], [4, 1, 2, 1]] };
  readonly multiBarOptions = { fullWidth: true, height: '300px', stackBars: true, axisX: { labelInterpolationFnc: (value: string) => value.split(/\s+/).map((word) => word[0]).join('') }, axisY: { offset: 20 } };
  readonly multiBarResponsive = [['screen and (min-width: 400px)', { reverseData: true, horizontalBars: true, axisX: { labelInterpolationFnc: (value: string) => value }, axisY: { offset: 60 } }], ['screen and (min-width: 700px)', { stackBars: false, reverseData: false, horizontalBars: false, seriesBarDistance: 15 }]];
  readonly stackedBarData = { labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'], series: [[800000, 1200000, 1400000, 1300000], [200000, 400000, 500000, 300000], [100000, 200000, 400000, 600000]] };
  readonly stackedBarOptions = { fullWidth: true, height: '300px', stackBars: true, axisY: { labelInterpolationFnc: (value: number) => `${value / 1000}k` } };
  readonly simplePieData = { series: [5, 3, 4] };
  readonly simplePieOptions = { fullWidth: true, height: '300px', weight: '300px', labelInterpolationFnc: (value: number) => `${Math.round(value / 12 * 100)}%` };
  readonly labelsPieData = { labels: ['Bananas', 'Apples', 'Grapes'], series: [20, 15, 40] };
  readonly labelsPieOptions = { fullWidth: true, height: '300px', weight: '300px', labelDirection: 'explode', labelInterpolationFnc: (value: string) => value[0] };
  readonly simpleDonutData = { labels: ['Bananas', 'Apples', 'Grapes'], series: [20, 15, 40] };
  readonly simpleDonutOptions = { fullWidth: true, donut: true, height: '300px', weight: '300px', labelDirection: 'explode', labelInterpolationFnc: (value: string) => value[0] };
  readonly donutResponsive = this.getResponsive(5, 40);
  readonly pieResponsive = this.getResponsive(20, 80);
  private getResponsive(padding: number, offset: number) {
    return [['screen and (min-width: 1550px)', { chartPadding: padding, labelOffset: offset, labelDirection: 'explode', labelInterpolationFnc: (value: string) => value }], ['screen and (max-width: 1200px)', { chartPadding: padding, labelOffset: offset, labelDirection: 'explode', labelInterpolationFnc: (value: string) => value }], ['screen and (max-width: 600px)', { chartPadding: 0, labelOffset: 0, labelInterpolationFnc: (value: string) => value[0] }]];
  }
}
