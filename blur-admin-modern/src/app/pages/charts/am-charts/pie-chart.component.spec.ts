import { TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';

describe('PieChartComponent', () => {
  it('renders and disposes its legacy host', () => {
    const fixture = TestBed.createComponent(PieChartComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#pieChart.admin-chart')).toBeTruthy();
    const root = fixture.componentInstance.root;
    expect(root).toBeTruthy();
    fixture.destroy();
    expect(root!.isDisposed()).toBeTrue();
  });
});
