import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { ChartistDirective } from './chartist.directive';

describe('ChartistDirective', () => {
  it('creates a chart and detaches it on destroy', fakeAsync(() => {
    const host = document.createElement('div');
    const directive = new ChartistDirective(new ElementRef(host));
    directive.chartistData = { labels: ['A', 'B'], series: [[1, 2]] };
    directive.chartistOptions = { height: '100px' };
    directive.ngAfterViewInit();
    tick();
    expect(host.querySelector('svg')).toBeTruthy();
    const chart = (directive as unknown as { chart: { detach(): void } }).chart;
    spyOn(chart, 'detach').and.callThrough();
    directive.ngOnDestroy();
    expect(chart.detach).toHaveBeenCalled();
    expect(host.querySelector('svg')).toBeTruthy();
  }));
});
