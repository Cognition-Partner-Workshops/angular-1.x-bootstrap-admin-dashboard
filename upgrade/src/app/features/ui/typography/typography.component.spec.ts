import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypographyComponent } from './typography.component';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render typography screen container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('[data-testid="typography-screen"]');
    expect(container).toBeTruthy();
  });

  it('should render Text Size panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headingWidget = compiled.querySelector('.heading-widget');
    expect(headingWidget).toBeTruthy();
    const title = headingWidget?.querySelector('.panel-title');
    expect(title?.textContent).toContain('Text Size');
  });

  it('should render all heading levels (H1-H5)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headingWidget = compiled.querySelector('.heading-widget');
    expect(headingWidget?.querySelector('h1')).toBeTruthy();
    expect(headingWidget?.querySelector('h2')).toBeTruthy();
    expect(headingWidget?.querySelector('h3')).toBeTruthy();
    expect(headingWidget?.querySelector('h4')).toBeTruthy();
    expect(headingWidget?.querySelector('h5')).toBeTruthy();
  });

  it('should render Some more text panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const moreTextWidget = compiled.querySelector('.more-text-widget');
    expect(moreTextWidget).toBeTruthy();
    const title = moreTextWidget?.querySelector('.panel-title');
    expect(title?.textContent).toContain('Some more text');
  });

  it('should render Lists panel with unordered and ordered lists', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listsWidget = compiled.querySelector('.lists-widget');
    expect(listsWidget).toBeTruthy();
    expect(listsWidget?.querySelector('ul.blur')).toBeTruthy();
    expect(listsWidget?.querySelector('ol.blur')).toBeTruthy();
  });

  it('should render Text Color panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const colorWidget = compiled.querySelector('.color-widget');
    expect(colorWidget).toBeTruthy();
    const title = colorWidget?.querySelector('.panel-title');
    expect(title?.textContent).toContain('Text Color');
  });

  it('should render banner section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const banner = compiled.querySelector('.banner');
    expect(banner).toBeTruthy();
    const bannerText = banner?.querySelector('.banner-text h1');
    expect(bannerText?.textContent).toContain('Simple Banner Text');
  });

  it('should render columns section with images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('.section');
    expect(section).toBeTruthy();
    const images = section?.querySelectorAll('.img-wrapper img');
    expect(images?.length).toBeGreaterThan(0);
  });

  it('should have four typography widget panels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const widgets = compiled.querySelectorAll('.typography-widget');
    expect(widgets.length).toBe(4);
  });
});
