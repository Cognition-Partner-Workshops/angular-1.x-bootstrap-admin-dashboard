import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeBoxComponent } from './compose-box.component';
import { ComposeModalService } from './compose-modal.service';

describe('ComposeModalService', () => {
  it('opens the compose component and sets fields', () => {
    const ref = { componentInstance: {} } as any;
    const modal = { open: jasmine.createSpy('open').and.returnValue(ref) } as unknown as NgbModal;
    const service = new ComposeModalService(modal);
    service.open({ subject: 's', to: 't', text: 'x' });
    expect(modal.open).toHaveBeenCalledWith(ComposeBoxComponent, { animation: false, size: 'compose' });
    expect(ref.componentInstance).toEqual({ subject: 's', to: 't', text: 'x' });
  });
});
