import { TestBed } from '@angular/core/testing';
import { ChartJs1DComponent } from './chart-js-1d.component';

describe('ChartJs1DComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ChartJs1DComponent] }));
  it('uses the legacy labels and values', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    expect(component.labels).toEqual(['Sleeping', 'Designing', 'Coding', 'Cycling']);
    expect(component.dataValues).toEqual([20, 40, 5, 35]);
  });
  it('shuffles without changing the data multiset', () => {
    const component = TestBed.createComponent(ChartJs1DComponent).componentInstance;
    const original = [...component.dataValues].sort();
    component.changeData();
    expect([...component.dataValues].sort()).toEqual(original);
  });
});
