import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from './profile-modal.component';

describe('ProfileModalComponent', () => {
  let fixture: ComponentFixture<ProfileModalComponent>;
  let component: ProfileModalComponent;
  let activeModal: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(async () => {
    activeModal = jasmine.createSpyObj<NgbActiveModal>('NgbActiveModal', ['close', 'dismiss']);
    await TestBed.configureTestingModule({
      imports: [ProfileModalComponent],
      providers: [{ provide: NgbActiveModal, useValue: activeModal }],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and renders Add Account', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Add Account');
  });

  it('closes with the typed link', () => {
    component.link = 'https://x';
    component.ok();

    expect(activeModal.close).toHaveBeenCalledWith('https://x');
  });

  it('dismisses from the close button', () => {
    (fixture.nativeElement.querySelector('button.close') as HTMLButtonElement).click();

    expect(activeModal.dismiss).toHaveBeenCalled();
  });
});
