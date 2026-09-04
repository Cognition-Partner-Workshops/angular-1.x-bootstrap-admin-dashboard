import { TestBed } from '@angular/core/testing';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastr = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'info', 'error', 'warning', 'clear']);
    toastr.toastrConfig = { positionClass: 'original', timeOut: 123 } as GlobalConfig;
    toastr.info.and.returnValue({ toastId: 1 } as never);
    toastr.success.and.returnValue({ toastId: 2 } as never);
    toastr.error.and.returnValue({ toastId: 3 } as never);
    toastr.warning.and.returnValue({ toastId: 4 } as never);
    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
      providers: [{ provide: ToastrService, useValue: toastr }],
    }).compileComponents();
  });

  it('renders the default title and opens a configured toast', async () => {
    const fixture = TestBed.createComponent(NotificationsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('#title') as HTMLInputElement).value).toBe('Some title here');
    fixture.componentInstance.openToast();
    expect(toastr.info).toHaveBeenCalledWith(
      'Type your message here',
      'Some title here',
      jasmine.objectContaining({ positionClass: 'toast-top-right', timeOut: 5000 }),
    );
    expect(fixture.componentInstance.optionsStr.startsWith("toastr.info('Type your message here', 'Some title here', ")).toBeTrue();
  });

  it('opens random, clears all, and clears the last toast', () => {
    const component = TestBed.createComponent(NotificationsComponent).componentInstance;
    component.openRandomToast();
    expect(toastr.info.calls.count() + toastr.success.calls.count() + toastr.error.calls.count() + toastr.warning.calls.count()).toBe(1);
    component.openToast();
    component.clearToasts();
    expect(toastr.clear).toHaveBeenCalledWith();
    component.clearLastToast();
    expect(toastr.clear).toHaveBeenCalledWith(1);
  });

  it('restores the global toastr configuration', () => {
    const component = TestBed.createComponent(NotificationsComponent).componentInstance;
    component.openToast();
    component.ngOnDestroy();
    expect(toastr.toastrConfig as unknown).toEqual(jasmine.objectContaining({ positionClass: 'original', timeOut: 123 }));
  });
});
