import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaProgressModalService } from '../../../theme';
import { BasicModalComponent } from './modal-templates/basic-modal.component';
import { MessageModalComponent } from './modal-templates/message-modal.component';
import { ModalsComponent } from './modals.component';

describe('ModalsComponent', () => {
  let modal: jasmine.SpyObj<NgbModal>;
  let progress: jasmine.SpyObj<BaProgressModalService>;
  let clockInstalled = false;

  beforeEach(async () => {
    modal = jasmine.createSpyObj<NgbModal>('NgbModal', ['open']);
    modal.open.and.returnValue({ componentInstance: {} } as never);
    progress = jasmine.createSpyObj<BaProgressModalService>('BaProgressModalService', ['setProgress', 'getProgress', 'open', 'close']);
    let current = 0;
    progress.setProgress.and.callFake((value: number) => current = value);
    progress.getProgress.and.callFake(() => current);
    const toastr = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'info', 'error', 'warning']);
    await TestBed.configureTestingModule({
      imports: [ModalsComponent],
      providers: [
        { provide: NgbModal, useValue: modal },
        { provide: BaProgressModalService, useValue: progress },
        { provide: ToastrService, useValue: toastr },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    if (clockInstalled) {
      jasmine.clock().uninstall();
      clockInstalled = false;
    }
  });

  it('renders panel titles and button labels', () => {
    const fixture = TestBed.createComponent(ModalsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Modals');
    expect(fixture.nativeElement.textContent).toContain('Message Modals');
    expect(fixture.nativeElement.textContent).toContain('Notifications');
    expect(fixture.nativeElement.textContent).toContain('Progress dialogs');
    expect(fixture.nativeElement.textContent).toContain('Default modal');
    expect(fixture.nativeElement.textContent).toContain('Progress dialog');
  });

  it('opens basic modal with large size', () => {
    const component = TestBed.createComponent(ModalsComponent).componentInstance;
    component.open('lg');
    expect(modal.open).toHaveBeenCalledWith(BasicModalComponent, { animation: true, size: 'lg' });
  });

  it('sets message modal fields', () => {
    const component = TestBed.createComponent(ModalsComponent).componentInstance;
    const ref = { componentInstance: {} as Record<string, unknown> };
    modal.open.and.returnValue(ref as never);
    component.openMessage('danger');
    expect(ref.componentInstance).toEqual({
      kind: 'danger',
      icon: 'ion-flame',
      heading: 'Error',
      message: "Your information hasn't been saved!",
    });
    expect(modal.open).toHaveBeenCalledWith(MessageModalComponent);
  });

  it('closes the progress dialog after reaching 100 percent', () => {
    jasmine.clock().install();
    clockInstalled = true;
    const component = TestBed.createComponent(ModalsComponent).componentInstance;
    component.openProgressDialog();
    jasmine.clock().tick(3000);
    expect(progress.close).toHaveBeenCalled();
  });
});
