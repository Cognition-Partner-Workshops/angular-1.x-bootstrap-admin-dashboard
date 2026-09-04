import { TestBed } from '@angular/core/testing';
import { ComposeModalService } from './compose-box/compose-modal.service';
import { MailMessagesService } from './mail-messages.service';
import { MailTabService } from './mail-tab.service';

describe('MailTabService', () => {
  let service: MailTabService;
  let compose: jasmine.SpyObj<ComposeModalService>;
  beforeEach(() => {
    compose = jasmine.createSpyObj('ComposeModalService', ['open']);
    TestBed.configureTestingModule({ providers: [MailMessagesService, { provide: ComposeModalService, useValue: compose }, MailTabService] });
    service = TestBed.inject(MailTabService);
  });
  it('starts collapsed and toggles', () => { expect(service.navigationCollapsed()).toBeTrue(); service.toggleNavigation(); expect(service.navigationCollapsed()).toBeFalse(); });
  it('opens compose with options', () => { service.showCompose('s', 't', 'x'); expect(compose.open).toHaveBeenCalledWith({ subject: 's', to: 't', text: 'x' }); });
});
