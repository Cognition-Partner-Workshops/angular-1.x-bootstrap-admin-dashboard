import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { NotificationsWidgetComponent } from './notifications-widget.component';

describe('NotificationsWidgetComponent', () => {
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastr = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'info', 'error', 'warning']);
    await TestBed.configureTestingModule({
      imports: [NotificationsWidgetComponent],
      providers: [{ provide: ToastrService, useValue: toastr }],
    }).compileComponents();
  });

  it('renders four notification buttons', () => {
    const fixture = TestBed.createComponent(NotificationsWidgetComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(4);
  });

  it('shows the matching messages', () => {
    const fixture = TestBed.createComponent(NotificationsWidgetComponent);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[1].click();
    buttons[2].click();
    buttons[3].click();
    expect(toastr.success).toHaveBeenCalledWith('Your information has been saved successfully!');
    expect(toastr.info).toHaveBeenCalledWith("You've got a new email!", 'Information');
    expect(toastr.warning).toHaveBeenCalledWith('Your computer is about to explode!', 'Warning');
    expect(toastr.error).toHaveBeenCalledWith("Your information hasn't been saved!", 'Error');
  });
});
