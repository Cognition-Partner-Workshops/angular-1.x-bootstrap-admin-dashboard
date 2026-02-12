import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MailComponent } from './mail.component';
import { MailMessagesService } from './mail-messages.service';
import { provideRouter } from '@angular/router';

describe('MailComponent', () => {
  let component: MailComponent;
  let fixture: ComponentFixture<MailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailComponent, RouterTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 mail tabs matching legacy data', () => {
    expect(component.tabs.length).toBe(6);
  });

  it('should have correct tab structure matching legacy', () => {
    const expectedTabs = [
      { label: 'inbox', name: 'Inbox', newMails: 7 },
      { label: 'sent', name: 'Sent Mail' },
      { label: 'important', name: 'Important' },
      { label: 'draft', name: 'Draft', newMails: 2 },
      { label: 'spam', name: 'Spam' },
      { label: 'trash', name: 'Trash' }
    ];

    component.tabs.forEach((tab, index) => {
      expect(tab.label).toBe(expectedTabs[index].label);
      expect(tab.name).toBe(expectedTabs[index].name);
      if (expectedTabs[index].newMails) {
        expect(tab.newMails).toBe(expectedTabs[index].newMails);
      }
    });
  });

  it('should start with navigation collapsed', () => {
    expect(component.navigationCollapsed).toBe(true);
  });

  it('should toggle navigation state', () => {
    expect(component.navigationCollapsed).toBe(true);
    component.toggleNavigation();
    expect(component.navigationCollapsed).toBe(false);
    component.toggleNavigation();
    expect(component.navigationCollapsed).toBe(true);
  });

  it('should render mail container', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('[data-testid="mail-container"]');
    expect(container).toBeTruthy();
  }));

  it('should render compose button', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const composeButton = compiled.querySelector('[data-testid="compose-button"]');
    expect(composeButton).toBeTruthy();
    expect(composeButton?.textContent?.trim()).toBe('Compose');
  }));

  it('should render all mail tabs', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const tabs = compiled.querySelectorAll('[data-testid="mail-tab"]');
    expect(tabs.length).toBe(6);
  }));

  it('should render label tags (Work, Family, Friend, Study)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = compiled.querySelectorAll('.tag.label');
    expect(labels.length).toBe(4);
    
    const labelTexts = Array.from(labels).map(l => l.textContent?.trim());
    expect(labelTexts).toContain('Work');
    expect(labelTexts).toContain('Family');
    expect(labelTexts).toContain('Friend');
    expect(labelTexts).toContain('Study');
  }));

  it('should display new mail counts for inbox and draft', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    const newMailBadges = compiled.querySelectorAll('.new-mails');
    expect(newMailBadges.length).toBe(2);
    
    const badgeValues = Array.from(newMailBadges).map(b => b.textContent?.trim());
    expect(badgeValues).toContain('7');
    expect(badgeValues).toContain('2');
  }));
});

describe('MailMessagesService', () => {
  let service: MailMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 6 tabs', () => {
    const tabs = service.getTabs();
    expect(tabs.length).toBe(6);
  });

  it('should return messages by label', () => {
    const inboxMessages = service.getMessagesByLabel('inbox');
    expect(inboxMessages.length).toBeGreaterThan(0);
    inboxMessages.forEach(m => {
      expect(m.labels).toContain('inbox');
    });
  });

  it('should return message by id', () => {
    const message = service.getMessageById('4563faass');
    expect(message).toBeTruthy();
    expect(message?.name).toBe('Nasta Linnie');
    expect(message?.subject).toBe('Great text');
  });

  it('should return undefined for non-existent message id', () => {
    const message = service.getMessageById('non-existent-id');
    expect(message).toBeUndefined();
  });

  it('should have messages sorted by date descending (newest first)', () => {
    const inboxMessages = service.getMessagesByLabel('inbox');
    for (let i = 0; i < inboxMessages.length - 1; i++) {
      const currentDate = new Date(inboxMessages[i].date);
      const nextDate = new Date(inboxMessages[i + 1].date);
      expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
    }
  });

  it('should have correct message structure matching legacy data', () => {
    const message = service.getMessageById('4563faass');
    expect(message).toBeTruthy();
    expect(message?.id).toBe('4563faass');
    expect(message?.name).toBe('Nasta Linnie');
    expect(message?.subject).toBe('Great text');
    expect(message?.email).toBe('petraramsey@mail.com');
    expect(message?.position).toBe('Great Employee');
    expect(message?.tag).toBe('friend');
    expect(message?.attachment).toBe('poem.txt');
    expect(message?.labels).toContain('inbox');
  });

  it('should strip HTML from message body', () => {
    const html = '<p>Hello <strong>World</strong></p>';
    const plainText = service.stripHtml(html);
    expect(plainText).toBe('Hello World');
  });
});
