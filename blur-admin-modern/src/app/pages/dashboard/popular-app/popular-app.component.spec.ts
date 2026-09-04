import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularAppComponent } from './popular-app.component';

describe('PopularAppComponent', () => {
  let fixture: ComponentFixture<PopularAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PopularAppComponent] }).compileComponents();
    fixture = TestBed.createComponent(PopularAppComponent);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());

  it('renders the legacy logo, name, cost and stats', () => {
    const el: HTMLElement = fixture.nativeElement;
    const img = el.querySelector('.popular-app-img img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('assets/img/app/my-app-logo.png');
    expect(el.querySelector('.logo-text')?.textContent).toContain('Super');
    expect(el.querySelector('.logo-text')?.textContent).toContain('App');
    const cost = el.querySelector('.popular-app-cost') as HTMLElement;
    expect(cost.textContent).toContain('Most Popular App');
    expect(cost.textContent).toContain('175$');
    const info = el.querySelector('.popular-app-info') as HTMLElement;
    for (const expected of ['Total Visits', '47,512', 'New Visits', '9,217', 'Sales', '2,928']) {
      expect(info.textContent).toContain(expected);
    }
    expect(info.querySelectorAll('.col-4').length).toBe(3);
    expect(cost.querySelector('.text-end')).toBeTruthy();
  });
});
