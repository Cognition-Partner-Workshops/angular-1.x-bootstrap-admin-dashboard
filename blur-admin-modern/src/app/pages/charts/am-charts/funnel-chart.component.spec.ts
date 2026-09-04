import { TestBed } from '@angular/core/testing';
import { FunnelChartComponent } from './funnel-chart.component';

describe('FunnelChartComponent', () => {
  it('renders and disposes its legacy host', () => {
    const fixture = TestBed.createComponent(FunnelChartComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#funnelChart.admin-chart')).toBeTruthy();
    const root = fixture.componentInstance.root;
    expect(root).toBeTruthy();
    fixture.destroy();
    expect(root!.isDisposed()).toBeTrue();
  });
});
