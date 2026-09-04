import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestBed } from '@angular/core/testing';
import { BasicModalComponent } from './basic-modal.component';

describe('BasicModalComponent', () => {
  let dismiss: jasmine.Spy;

  beforeEach(async () => {
    dismiss = jasmine.createSpy('dismiss');
    await TestBed.configureTestingModule({
      imports: [BasicModalComponent],
      providers: [{ provide: NgbActiveModal, useValue: { dismiss } }],
    }).compileComponents();
  });

  it('renders the title and dismisses from all controls', () => {
    const fixture = TestBed.createComponent(BasicModalComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-title').textContent).toContain('Modal title');
    fixture.nativeElement.querySelector('.close').click();
    fixture.nativeElement.querySelector('.modal-footer button').click();
    expect(dismiss).toHaveBeenCalledTimes(2);
  });
});
