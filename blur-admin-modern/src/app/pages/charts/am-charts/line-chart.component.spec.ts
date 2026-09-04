import { TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  it('renders and disposes its legacy host', () => {
    const fixture = TestBed.createComponent(LineChartComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#lineChart.admin-chart')).toBeTruthy();
    const root = fixture.componentInstance.root;
    expect(root).toBeTruthy();
    fixture.destroy();
    expect(root!.isDisposed()).toBeTrue();
  });
});
