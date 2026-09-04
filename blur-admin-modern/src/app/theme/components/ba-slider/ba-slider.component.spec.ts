import { TestBed } from '@angular/core/testing';
import { BaSliderComponent } from './ba-slider.component';

describe('BaSliderComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [BaSliderComponent] }));

  it('creates', () => expect(TestBed.createComponent(BaSliderComponent)).toBeTruthy());

  it('renders ngx-slider and reflects the from value', () => {
    const fixture = TestBed.createComponent(BaSliderComponent);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.componentRef.setInput('from', 30);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ngx-slider')).toBeTruthy();
    expect(fixture.componentInstance.fromValue).toBe(30);
  });
});
