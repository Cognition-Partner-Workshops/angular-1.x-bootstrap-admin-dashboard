import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlurFeedComponent } from './blur-feed.component';

describe('BlurFeedComponent', () => {
  let fixture: ComponentFixture<BlurFeedComponent>;
  let component: BlurFeedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurFeedComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BlurFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all feed messages', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.feed-message').length).toBe(component.feed.length);
    expect(el.textContent).toContain('Kostya Danovsky');
  });

  it('should toggle a message expanded state on click', () => {
    const first = component.feed[0];
    expect(first.expanded).toBeFalse();

    const el = fixture.nativeElement as HTMLElement;
    const messageEl = el.querySelector('.feed-message') as HTMLElement;
    messageEl.click();
    fixture.detectChanges();
    expect(first.expanded).toBeTrue();

    messageEl.click();
    fixture.detectChanges();
    expect(first.expanded).toBeFalse();
  });
});
