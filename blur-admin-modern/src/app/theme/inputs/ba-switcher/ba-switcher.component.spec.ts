import { TestBed } from '@angular/core/testing';
import { BaSwitcherComponent } from './ba-switcher.component';

describe('BaSwitcherComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [BaSwitcherComponent] }));

  it('creates', () => expect(TestBed.createComponent(BaSwitcherComponent)).toBeTruthy());

  it('applies the style and toggles its model on click', () => {
    const fixture = TestBed.createComponent(BaSwitcherComponent);
    fixture.componentRef.setInput('switcherStyle', 'primary');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(fixture.nativeElement.querySelector('.switcher').classList).toContain('primary');
    input.click();
    expect(fixture.componentInstance.switcherValue()).toBeTrue();
  });
});
