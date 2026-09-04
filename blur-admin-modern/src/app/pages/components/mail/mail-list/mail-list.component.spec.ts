import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MailMessagesService } from '../mail-messages.service';
import { MailTabService } from '../mail-tab.service';
import { MailListComponent } from './mail-list.component';

describe('MailListComponent', () => {
  it('renders the inbox messages', async () => {
    await TestBed.configureTestingModule({
      imports: [MailListComponent],
      providers: [provideRouter([]), MailMessagesService, MailTabService, { provide: ActivatedRoute, useValue: { paramMap: new BehaviorSubject(convertToParamMap({ label: 'inbox' })) } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MailListComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(7);
    expect(fixture.nativeElement.textContent).toContain('Nasta Linnie');
  });
});
