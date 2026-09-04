import { TestBed } from '@angular/core/testing';
import { TypographyComponent } from './typography.component';

describe('TypographyComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [TypographyComponent] }).compileComponents());

  it('creates and renders every legacy panel', () => {
    const fixture = TestBed.createComponent(TypographyComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    const titles = [...fixture.nativeElement.querySelectorAll('.panel-title')].map((el: HTMLElement) => el.textContent?.trim());
    expect(titles).toEqual(['Text Size', 'Some more text', 'Lists', 'Text Color']);
  });
});
