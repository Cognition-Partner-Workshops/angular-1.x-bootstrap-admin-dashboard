import { TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  it('renders and disposes its legacy host', () => {
    const fixture = TestBed.createComponent(BarChartComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#barChart.admin-chart')).toBeTruthy();
    const root = fixture.componentInstance.root;
    expect(root).toBeTruthy();
    fixture.destroy();
    expect(root!.isDisposed()).toBeTrue();
  });
});
