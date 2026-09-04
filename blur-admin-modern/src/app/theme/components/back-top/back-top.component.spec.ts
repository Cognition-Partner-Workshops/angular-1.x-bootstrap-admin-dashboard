import { TestBed } from '@angular/core/testing';
import { BackTopComponent } from './back-top.component';

describe('BackTopComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [BackTopComponent] }).compileComponents());
  it('creates and renders the back-to-top icon', () => {
    const fixture = TestBed.createComponent(BackTopComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#backTop')).toBeTruthy();
  });
  it('scrolls smoothly to the top', () => {
    const fixture = TestBed.createComponent(BackTopComponent);
    const scroll = spyOn(window, 'scrollTo');
    fixture.componentInstance.scrollToTop();
    const options = scroll.calls.mostRecent().args[0] as unknown as { top: number; behavior: string };
    expect(options.top).toBe(0);
    expect(options.behavior).toBe('smooth');
  });
});
