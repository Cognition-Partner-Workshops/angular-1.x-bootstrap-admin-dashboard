import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MailMessagesService } from '../mail-messages.service';
import { MailTabService } from '../mail-tab.service';
import { MailDetailComponent } from './mail-detail.component';

describe('MailDetailComponent', () => {
  it('renders the selected message and replies', async () => {
    const params = new BehaviorSubject(convertToParamMap({ label: 'inbox', id: '4563faass' }));
    const tab = jasmine.createSpyObj('MailTabService', ['showCompose'], { navigationCollapsed: () => true });
    await TestBed.configureTestingModule({ imports: [MailDetailComponent], providers: [provideRouter([]), MailMessagesService, { provide: MailTabService, useValue: tab }, { provide: ActivatedRoute, useValue: { paramMap: params } }] }).compileComponents();
    const fixture = TestBed.createComponent(MailDetailComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Great text');
    expect(fixture.nativeElement.textContent).toContain('poem.txt');
    (fixture.nativeElement.querySelector('.answer-container .btn') as HTMLElement).click();
    expect(tab.showCompose).toHaveBeenCalledWith('Great text', 'petraramsey@mail.com', '');
  });
});
