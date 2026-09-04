import { TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ButtonsComponent] }).compileComponents());

  it('creates and renders every legacy panel', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    const titles = [...fixture.nativeElement.querySelectorAll('.panel-title')].map((el: HTMLElement) => el.textContent?.trim());
    expect(titles).toEqual([
      'Flat Buttons', 'Raised Buttons', 'Different sizes', 'Disabled',
      'Icon Buttons', 'Large Buttons', 'Button Dropdowns', 'Button Groups', 'Progress Buttons',
    ]);
  });
});
