import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestBed } from '@angular/core/testing';
import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  it('renders inputs and dismisses from OK', async () => {
    const dismiss = jasmine.createSpy('dismiss');
    await TestBed.configureTestingModule({
      imports: [MessageModalComponent],
      providers: [{ provide: NgbActiveModal, useValue: { dismiss } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MessageModalComponent);
    const component = fixture.componentInstance;
    component.kind = 'danger';
    component.icon = 'ion-flame';
    component.heading = 'Error';
    component.message = "Your information hasn't been saved!";
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Error');
    expect(fixture.nativeElement.textContent).toContain("Your information hasn't been saved!");
    fixture.nativeElement.querySelector('.modal-footer button').click();
    expect(dismiss).toHaveBeenCalled();
  });
});
