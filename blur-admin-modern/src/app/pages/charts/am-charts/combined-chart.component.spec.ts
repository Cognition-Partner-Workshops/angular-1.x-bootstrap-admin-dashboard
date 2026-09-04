import { TestBed } from '@angular/core/testing';
import { CombinedChartComponent } from './combined-chart.component';

describe('CombinedChartComponent', () => {
  it('renders and disposes its legacy host', () => {
    const fixture = TestBed.createComponent(CombinedChartComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#zoomAxisChart.admin-chart')).toBeTruthy();
    const root = fixture.componentInstance.root;
    expect(root).toBeTruthy();
    fixture.destroy();
    expect(root!.isDisposed()).toBeTrue();
  });
});
