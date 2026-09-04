import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgressModalComponent } from '../components/progress-modal/progress-modal.component';
import { BaProgressModalService } from './ba-progress-modal.service';

describe('BaProgressModalService', () => {
  it('creates and tracks progress', () => {
    const service = new BaProgressModalService({} as NgbModal);
    service.setProgress(50);
    expect(service.getProgress()).toBe(50);
  });

  it('opens and closes the modal with guards', () => {
    const ref = { close: jasmine.createSpy('close') };
    const modal = { open: jasmine.createSpy('open').and.returnValue(ref) } as unknown as NgbModal;
    const service = new BaProgressModalService(modal);
    service.open();
    expect(modal.open).toHaveBeenCalledWith(ProgressModalComponent, jasmine.any(Object));
    expect(() => service.open()).toThrowError('Progress modal opened now');
    service.close();
    expect(ref.close).toHaveBeenCalled();
    expect(() => service.close()).toThrowError('Progress modal is not active');
    expect(() => service.setProgress(101)).toThrowError("Progress can't be greater than max");
  });
});
