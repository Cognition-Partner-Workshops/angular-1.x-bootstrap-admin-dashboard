import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileReaderService } from '../../theme';
import { ProfileComponent, SocialProfile } from './profile.component';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  let modal: jasmine.SpyObj<NgbModal>;
  let fileReader: jasmine.SpyObj<FileReaderService>;

  beforeEach(async () => {
    modal = jasmine.createSpyObj<NgbModal>('NgbModal', ['open']);
    fileReader = jasmine.createSpyObj<FileReaderService>('FileReaderService', ['readAsDataUrl']);
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: NgbModal, useValue: modal },
        { provide: FileReaderService, useValue: fileReader },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and renders the profile content', () => {
    expect(component).toBeTruthy();
    const element = fixture.nativeElement as HTMLElement;
    const headings = Array.from(element.querySelectorAll('h3.with-line')).map((heading) =>
      heading.textContent?.trim(),
    );
    expect(headings).toEqual([
      'General Information',
      'Change Password',
      'Contact Information',
      'Social Profiles',
      'Send Email Notifications',
    ]);
    expect(element.querySelector('.progress-bar')?.getAttribute('aria-valuenow')).toBe('70');
    expect(element.querySelector('.progress-bar')?.getAttribute('style')).toContain('width: 70%');
  });

  it('renders eight social profiles with four connected links', () => {
    const links = fixture.nativeElement.querySelectorAll('.sn-link');
    expect(links.length).toBe(8);
    expect(fixture.nativeElement.querySelectorAll('.sn-link.connected').length).toBe(4);
  });

  it('removes the profile picture and hides the remove icon', () => {
    component.removePicture();
    fixture.detectChanges();

    expect(component.picture).toBe('assets/img/theme/no-photo.png');
    expect(fixture.nativeElement.querySelector('.userpic > i')).toBeNull();
  });

  it('unconnects a social profile', () => {
    const item = component.socialProfiles[0];
    component.unconnect(item);
    fixture.detectChanges();

    expect(item.href).toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('.sn-link.connected').length).toBe(3);
  });

  it('sets a social profile link after the modal resolves', async () => {
    const item = component.socialProfiles[2];
    modal.open.and.returnValue({ result: Promise.resolve('https://x') } as ReturnType<NgbModal['open']>);

    component.showModal(item);
    await fixture.whenStable();

    expect(item.href).toBe('https://x');
  });

  it('sets the picture from the selected file data URL', async () => {
    fileReader.readAsDataUrl.and.returnValue(Promise.resolve('data:x'));
    component.getFile(new File(['image'], 'image.png', { type: 'image/png' }));
    await fixture.whenStable();

    expect(fileReader.readAsDataUrl).toHaveBeenCalled();
    expect(component.picture).toBe('data:x');
  });

  it('renders switches with the legacy checked states', () => {
    const inputs = fixture.nativeElement.querySelectorAll('.switch-container input') as NodeListOf<HTMLInputElement>;
    const switches = Array.from(inputs).map((input) => input.checked);
    expect(switches).toEqual([true, true, false, true, true, false]);
  });
});
