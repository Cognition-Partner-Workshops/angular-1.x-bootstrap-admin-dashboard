import { MailMessagesService } from './mail-messages.service';

describe('MailMessagesService', () => {
  it('contains sorted demo messages and tabs', () => {
    const service = new MailMessagesService();
    expect(service.getMessagesByLabel('inbox').length).toBe(7);
    expect(service.getTabs().length).toBe(6);
    expect(service.getMessageById('4563faass')?.subject).toBe('Great text');
    expect(service.getMessageById('unknown')).toBeUndefined();
    const dates = service.getMessagesByLabel('inbox').map((message) => message.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});
