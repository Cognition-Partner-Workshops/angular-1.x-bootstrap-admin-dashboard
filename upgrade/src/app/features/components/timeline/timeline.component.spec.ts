import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 timeline items', () => {
    expect(component.timelineItems.length).toBe(7);
  });

  it('should have correct timeline item structure matching legacy data', () => {
    const expectedItems = [
      { id: 1, icon: 'Euro-Coin', colorVariant: 'warning', title: 'Title of section 1', date: 'Jan 14' },
      { id: 2, icon: 'Laptop-Signal', colorVariant: 'danger', title: 'Title of section 2', date: 'Jan 18' },
      { id: 3, icon: 'Checklist', colorVariant: 'primary', title: 'Title of section 3', date: 'Feb 18' },
      { id: 4, icon: 'Boss-3', colorVariant: 'warning', title: 'Title of section 4', date: 'Feb 20' },
      { id: 5, icon: 'Online-Shopping', colorVariant: 'danger', title: 'Title of section 5', date: 'Feb 21' },
      { id: 6, icon: 'Money-Increase', colorVariant: 'primary', title: 'Title of section 6', date: 'Feb 23' },
      { id: 7, icon: 'Vector', colorVariant: 'warning', title: 'Title of section 7', date: 'Feb 24' }
    ];

    component.timelineItems.forEach((item, index) => {
      expect(item.id).toBe(expectedItems[index].id);
      expect(item.icon).toBe(expectedItems[index].icon);
      expect(item.colorVariant).toBe(expectedItems[index].colorVariant);
      expect(item.title).toBe(expectedItems[index].title);
      expect(item.date).toBe(expectedItems[index].date);
      expect(item.description).toBeTruthy();
    });
  });

  it('should generate correct icon paths', () => {
    expect(component.getIconPath('Euro-Coin')).toBe('assets/img/theme/icon/kameleon/Euro-Coin.svg');
    expect(component.getIconPath('Checklist')).toBe('assets/img/theme/icon/kameleon/Checklist.svg');
  });

  it('should render timeline container', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('[data-testid="timeline-container"]');
    expect(container).toBeTruthy();
  }));

  it('should render all timeline blocks', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const blocks = compiled.querySelectorAll('.cd-timeline-block');
    expect(blocks.length).toBe(7);
  }));

  it('should render timeline items with correct color variants', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const warningItems = compiled.querySelectorAll('.cd-timeline-content.warning');
    const dangerItems = compiled.querySelectorAll('.cd-timeline-content.danger');
    const primaryItems = compiled.querySelectorAll('.cd-timeline-content.primary');
    
    expect(warningItems.length).toBe(3);
    expect(dangerItems.length).toBe(2);
    expect(primaryItems.length).toBe(2);
  }));

  it('should render timeline item titles', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = compiled.querySelectorAll('.cd-timeline-content h5');
    
    expect(titles.length).toBe(7);
    expect(titles[0].textContent).toBe('Title of section 1');
    expect(titles[6].textContent).toBe('Title of section 7');
  }));

  it('should render timeline item dates', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const dates = compiled.querySelectorAll('.cd-date');
    
    expect(dates.length).toBe(7);
    expect(dates[0].textContent).toBe('Jan 14');
    expect(dates[6].textContent).toBe('Feb 24');
  }));

  it('should have kameleon icons with round backgrounds', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('.kameleon-icon.with-round-bg');
    
    expect(icons.length).toBe(7);
  }));
});
