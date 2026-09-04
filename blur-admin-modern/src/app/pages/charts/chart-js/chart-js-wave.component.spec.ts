import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartJsWaveComponent } from './chart-js-wave.component';

describe('ChartJsWaveComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ChartJsWaveComponent], providers: [provideCharts(withDefaultRegisterables())] }));
  it('hides the legend', () => {
    const component = TestBed.createComponent(ChartJsWaveComponent).componentInstance;
    expect(component.options.plugins?.legend?.display).toBeFalse();
  });
  it('disables animation for rotating chart updates', () => {
    const component = TestBed.createComponent(ChartJsWaveComponent).componentInstance;
    expect(component.options.animation).toBeFalse();
  });
  it('rotates every 400ms and stops on destroy', fakeAsync(() => {
    const fixture = TestBed.createComponent(ChartJsWaveComponent);
    const component = fixture.componentInstance;
    const first = component.dataValues[0];
    fixture.detectChanges();
    tick(399);
    expect(component.dataValues[0]).toBe(first);
    tick(1);
    expect(component.dataValues[1]).toBe(first);
    fixture.destroy();
    const snapshot = [...component.dataValues];
    tick(800);
    expect(component.dataValues).toEqual(snapshot);
  }));
});
