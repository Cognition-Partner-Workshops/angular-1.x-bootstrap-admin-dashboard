import { TestBed } from '@angular/core/testing';
import { ChartJs1DComponent } from './chart-js-1d.component';

describe('ChartJs1DComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ChartJs1DComponent] }));
  it('uses the legacy labels and values', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    expect(component.labels).toEqual(['Sleeping', 'Designing', 'Coding', 'Cycling']);
    expect(component.dataValues).toEqual([20, 40, 5, 35]);
  });
  it('uses chart-type-specific scales for one-dimensional charts', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    component.chartType = 'pie';
    expect(component.options.scales).toBeUndefined();
    component.chartType = 'doughnut';
    expect(component.options.scales).toBeUndefined();
    component.chartType = 'polarArea';
    expect(Object.keys(component.options.scales ?? {})).toEqual(['r']);
  });
  it('shuffles without changing the data multiset', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    const original = [...component.dataValues].sort();
    component.changeData();
    expect([...component.dataValues].sort()).toEqual(original);
  });
  it('returns the same data object across reads until data changes', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    const first = component.data;

    expect(component.data).toBe(first);

    component.changeData();

    expect(component.data).not.toBe(first);
  });
});
