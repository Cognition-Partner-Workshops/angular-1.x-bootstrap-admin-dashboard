import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MailMessagesService } from './mail-messages.service';
import { MailComponent } from './mail.component';
import { MailTabService } from './mail-tab.service';

describe('MailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MailComponent], providers: [provideRouter([]), MailMessagesService, MailTabService] }).compileComponents();
  });
  it('renders compose, tabs, and outlet', () => {
    const fixture = TestBed.createComponent(MailComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Compose');
    expect(fixture.nativeElement.querySelectorAll('.mail-navigation').length).toBe(6);
    expect(fixture.nativeElement.textContent).toContain('Inbox7');
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
