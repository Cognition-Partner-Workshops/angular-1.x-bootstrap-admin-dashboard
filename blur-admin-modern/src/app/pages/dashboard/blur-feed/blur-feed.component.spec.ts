import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlurFeedComponent } from './blur-feed.component';

describe('BlurFeedComponent', () => {
  let fixture: ComponentFixture<BlurFeedComponent>;
  let component: BlurFeedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlurFeedComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlurFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => expect(component).toBeTruthy());

  it('holds the eleven legacy feed messages in order', () => {
    expect(component.feed.length).toBe(11);
    expect(component.feed[0].author).toBe('Kostya');
    expect(component.feed[0].type).toBe('text-message');
    expect(component.feed[0].header).toBe('Posted new message');
    expect(component.feed[1]).toEqual(jasmine.objectContaining({ type: 'video-message', author: 'Andrey', header: 'Added new video', text: '"Vader and Me"' }));
    expect(component.feed[2]).toEqual(jasmine.objectContaining({ type: 'image-message', author: 'Vlad' }));
    expect(component.feed[4]).toEqual(jasmine.objectContaining({ type: 'geo-message', author: 'Nick', header: 'Posted location', text: '"New York, USA"' }));
    expect(component.feed[10].text).toContain('CoffeeScript');
    expect(component.feed.every((m) => m.expanded === false)).toBeTrue();
  });

  it('renders every message with profile picture, author and type icon', () => {
    const el: HTMLElement = fixture.nativeElement;
    const messages = el.querySelectorAll('.feed-message');
    expect(messages.length).toBe(11);
    const firstImg = messages[0].querySelector('img.photo-icon') as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toBe('assets/img/app/profile/Kostya.png');
    expect(messages[0].querySelector('.author')?.textContent?.trim()).toBe('Kostya Danovsky');
    expect(messages[0].querySelector('.sub-photo-icon')).toBeNull();
    expect(messages[1].querySelector('.sub-photo-icon.video-message')).toBeTruthy();
    expect(messages[2].querySelector('.sub-photo-icon.image-message')).toBeTruthy();
    expect(messages[4].querySelector('.sub-photo-icon.geo-message')).toBeTruthy();
    const preview = messages[1].querySelector('.preview img') as HTMLImageElement;
    expect(preview.getAttribute('src')).toBe('assets/img/app/feed/vader-and-me-preview.png');
  });

  it('toggles expanded state when a message is clicked', () => {
    const el: HTMLElement = fixture.nativeElement;
    const message = el.querySelectorAll('.feed-message')[0] as HTMLElement;
    const content = message.querySelector('.message-content') as HTMLElement;
    const time = message.querySelector('.message-time') as HTMLElement;
    expect(content.classList).toContain('line-clamp-2');
    expect(time.hidden).toBeTrue();

    message.click();
    fixture.detectChanges();
    expect(component.feed[0].expanded).toBeTrue();
    expect(content.classList).not.toContain('line-clamp-2');
    expect(time.hidden).toBeFalse();
    expect(time.textContent).toContain('Today 11:55 pm');
    expect(time.textContent).toContain('25 minutes ago');

    message.click();
    fixture.detectChanges();
    expect(component.feed[0].expanded).toBeFalse();
    expect(content.classList).toContain('line-clamp-2');
  });
});
