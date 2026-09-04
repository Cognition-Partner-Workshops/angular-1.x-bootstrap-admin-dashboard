import { TestBed } from '@angular/core/testing';
import { ChartJs2DComponent } from './chart-js-2d.component';

describe('ChartJs2DComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ChartJs2DComponent] }));
  it('uses two legacy series', () => {
    const component = TestBed.createComponent(ChartJs2DComponent).componentInstance;
    expect(component.series).toEqual(['Product A', 'Product B']);
    expect(component.dataValues).toEqual([[65, 59, 90, 81, 56], [28, 48, 40, 19, 88]]);
  });
  it('shuffles both series', () => {
    const component = TestBed.createComponent(ChartJs2DComponent).componentInstance;
    const original = component.dataValues.map((values) => [...values].sort());
    component.changeData();
    expect(component.dataValues.map((values) => [...values].sort())).toEqual(original);
  });
});
