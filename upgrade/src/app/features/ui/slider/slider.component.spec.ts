import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { provideRouter } from '@angular/router';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the slider component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the slider page container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const page = compiled.querySelector('[data-testid="slider-page"]');
      expect(page).toBeTruthy();
    });

    it('should render the slider panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="slider-panel"]');
      expect(panel).toBeTruthy();
      expect(panel?.querySelector('.panel-heading')?.textContent).toContain('Ion Range Slider');
    });
  });

  describe('Slider Configuration', () => {
    it('should have 8 slider configurations matching legacy', () => {
      expect(component.sliders.length).toBe(8);
    });

    it('should have basic slider with correct initial value', () => {
      const basicSlider = component.sliders.find(s => s.id === 'basic');
      expect(basicSlider).toBeTruthy();
      expect(basicSlider?.value).toBe(45);
      expect(basicSlider?.options.floor).toBe(0);
      expect(basicSlider?.options.ceil).toBe(100);
    });

    it('should have prefix slider with correct configuration', () => {
      const prefixSlider = component.sliders.find(s => s.id === 'prefix');
      expect(prefixSlider).toBeTruthy();
      expect(prefixSlider?.value).toBe(420);
      expect(prefixSlider?.options.floor).toBe(100);
      expect(prefixSlider?.options.ceil).toBe(1200);
    });

    it('should have postfix slider with correct configuration', () => {
      const postfixSlider = component.sliders.find(s => s.id === 'postfix');
      expect(postfixSlider).toBeTruthy();
      expect(postfixSlider?.value).toBe(36);
      expect(postfixSlider?.options.floor).toBe(-90);
      expect(postfixSlider?.options.ceil).toBe(90);
    });

    it('should have range slider with both value and highValue', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider).toBeTruthy();
      expect(rangeSlider?.value).toBe(420);
      expect(rangeSlider?.highValue).toBe(900);
      expect(rangeSlider?.options.floor).toBe(100);
      expect(rangeSlider?.options.ceil).toBe(1200);
    });

    it('should have steps slider with correct step configuration', () => {
      const stepsSlider = component.sliders.find(s => s.id === 'steps');
      expect(stepsSlider).toBeTruthy();
      expect(stepsSlider?.value).toBe(300);
      expect(stepsSlider?.options.step).toBe(50);
      expect(stepsSlider?.options.floor).toBe(0);
      expect(stepsSlider?.options.ceil).toBe(1000);
    });

    it('should have prettify slider with correct configuration', () => {
      const prettifySlider = component.sliders.find(s => s.id === 'prettify');
      expect(prettifySlider).toBeTruthy();
      expect(prettifySlider?.value).toBe(300000);
      expect(prettifySlider?.options.step).toBe(1000);
      expect(prettifySlider?.options.floor).toBe(0);
      expect(prettifySlider?.options.ceil).toBe(1000000);
    });

    it('should have custom values slider with months array', () => {
      const customSlider = component.sliders.find(s => s.id === 'custom-values');
      expect(customSlider).toBeTruthy();
      expect(customSlider?.value).toBe(5);
      expect(customSlider?.options.stepsArray?.length).toBe(12);
      expect(customSlider?.options.stepsArray?.[0].legend).toBe('January');
      expect(customSlider?.options.stepsArray?.[11].legend).toBe('December');
    });

    it('should have disabled slider with disabled option', () => {
      const disabledSlider = component.sliders.find(s => s.id === 'disabled');
      expect(disabledSlider).toBeTruthy();
      expect(disabledSlider?.value).toBe(45);
      expect(disabledSlider?.options.disabled).toBeTrue();
    });
  });

  describe('Slider Value Change', () => {
    it('should update slider value when onValueChange is called', () => {
      const initialValue = component.sliders.find(s => s.id === 'basic')?.value;
      expect(initialValue).toBe(45);

      component.onValueChange('basic', 75);

      const updatedValue = component.sliders.find(s => s.id === 'basic')?.value;
      expect(updatedValue).toBe(75);
    });

    it('should update high value for range slider', () => {
      const initialHighValue = component.sliders.find(s => s.id === 'range')?.highValue;
      expect(initialHighValue).toBe(900);

      component.onHighValueChange('range', 1000);

      const updatedHighValue = component.sliders.find(s => s.id === 'range')?.highValue;
      expect(updatedHighValue).toBe(1000);
    });

    it('should not throw error when updating non-existent slider', () => {
      expect(() => component.onValueChange('non-existent', 50)).not.toThrow();
    });
  });

  describe('Range Slider Min/Max', () => {
    it('should have range slider with correct min (floor)', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider?.options.floor).toBe(100);
    });

    it('should have range slider with correct max (ceil)', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider?.options.ceil).toBe(1200);
    });

    it('should have range slider value within min/max bounds', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider?.value).toBeGreaterThanOrEqual(rangeSlider?.options.floor ?? 0);
      expect(rangeSlider?.value).toBeLessThanOrEqual(rangeSlider?.options.ceil ?? 0);
    });

    it('should have range slider highValue within min/max bounds', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider?.highValue).toBeGreaterThanOrEqual(rangeSlider?.options.floor ?? 0);
      expect(rangeSlider?.highValue).toBeLessThanOrEqual(rangeSlider?.options.ceil ?? 0);
    });

    it('should have range slider value less than highValue', () => {
      const rangeSlider = component.sliders.find(s => s.id === 'range');
      expect(rangeSlider?.value).toBeLessThan(rangeSlider?.highValue ?? 0);
    });
  });

  describe('DOM Rendering', () => {
    it('should render all 8 slider boxes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sliderBoxes = compiled.querySelectorAll('.slider-box');
      expect(sliderBoxes.length).toBe(8);
    });

    it('should render basic slider box', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const basicBox = compiled.querySelector('[data-testid="slider-box-basic"]');
      expect(basicBox).toBeTruthy();
      expect(basicBox?.querySelector('h5')?.textContent).toBe('Basic');
    });

    it('should render range slider box', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rangeBox = compiled.querySelector('[data-testid="slider-box-range"]');
      expect(rangeBox).toBeTruthy();
      expect(rangeBox?.querySelector('h5')?.textContent).toBe('Two way range');
    });

    it('should render disabled slider box', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const disabledBox = compiled.querySelector('[data-testid="slider-box-disabled"]');
      expect(disabledBox).toBeTruthy();
      expect(disabledBox?.querySelector('h5')?.textContent).toBe('Disabled');
    });

    it('should render custom values slider box', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const customBox = compiled.querySelector('[data-testid="slider-box-custom-values"]');
      expect(customBox).toBeTruthy();
      expect(customBox?.querySelector('h5')?.textContent).toBe('Using custom values array');
    });
  });
});
