import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ModalService } from '../../shared/components/modal';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    modalServiceSpy.open.and.returnValue({
      close: jasmine.createSpy('close'),
      afterClosed: () => of(undefined)
    });

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the profile component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the profile page panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel).toBeTruthy();
    });
  });

  describe('Profile Display', () => {
    it('should display progress bar with 70% completion', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const progressInfo = compiled.querySelector('.progress-info');
      expect(progressInfo?.textContent).toContain('70%');
    });

    it('should display General Information section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.with-line');
      const headingTexts = Array.from(headings).map(h => h.textContent);
      expect(headingTexts).toContain('General Information');
    });

    it('should display Change Password section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.with-line');
      const headingTexts = Array.from(headings).map(h => h.textContent);
      expect(headingTexts).toContain('Change Password');
    });

    it('should display Contact Information section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.with-line');
      const headingTexts = Array.from(headings).map(h => h.textContent);
      expect(headingTexts).toContain('Contact Information');
    });

    it('should display Social Profiles section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.with-line');
      const headingTexts = Array.from(headings).map(h => h.textContent);
      expect(headingTexts).toContain('Social Profiles');
    });

    it('should display Email Notifications section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.with-line');
      const headingTexts = Array.from(headings).map(h => h.textContent);
      expect(headingTexts).toContain('Send Email Notifications');
    });

    it('should display profile picture', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const profilePicture = compiled.querySelector('[data-testid="profile-picture"]') as HTMLImageElement;
      expect(profilePicture).toBeTruthy();
      expect(profilePicture.src).toContain('Nasta.png');
    });

    it('should display first name input with default value', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstNameInput = compiled.querySelector('[data-testid="first-name-input"]') as HTMLInputElement;
      expect(firstNameInput).toBeTruthy();
      expect(firstNameInput.value).toBe('Anastasiya');
    });

    it('should display email input with default value', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailInput = compiled.querySelector('[data-testid="email-input"]') as HTMLInputElement;
      expect(emailInput).toBeTruthy();
      expect(emailInput.value).toBe('contact@akveo.com');
    });

    it('should display social profiles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const socialLinks = compiled.querySelectorAll('.sn-link');
      expect(socialLinks.length).toBe(8);
    });

    it('should display connected social profiles with href', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const connectedLinks = compiled.querySelectorAll('.sn-link.connected');
      expect(connectedLinks.length).toBe(5);
    });

    it('should display notification switches', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const switches = compiled.querySelectorAll('.switch-container input[type="checkbox"]');
      expect(switches.length).toBe(6);
    });

    it('should display Update Profile button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const updateButton = compiled.querySelector('[data-testid="update-profile-btn"]');
      expect(updateButton).toBeTruthy();
      expect(updateButton?.textContent).toContain('Update Profile');
    });
  });

  describe('Image Upload', () => {
    it('should have hidden file input for image upload', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const fileInput = compiled.querySelector('[data-testid="upload-file-input"]') as HTMLInputElement;
      expect(fileInput).toBeTruthy();
      expect(fileInput.type).toBe('file');
      expect(fileInput.accept).toBe('image/*');
    });

    it('should display change picture link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const changePictureLink = compiled.querySelector('[data-testid="change-picture-link"]');
      expect(changePictureLink).toBeTruthy();
      expect(changePictureLink?.textContent).toContain('Change Profile Picture');
    });

    it('should display remove picture button when picture exists', () => {
      component.noPicture = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const removeButton = compiled.querySelector('[data-testid="remove-picture-btn"]');
      expect(removeButton).toBeTruthy();
    });

    it('should hide remove picture button when no picture', () => {
      component.noPicture = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const removeButton = compiled.querySelector('[data-testid="remove-picture-btn"]');
      expect(removeButton).toBeFalsy();
    });

    it('should set noPicture to true when removePicture is called', () => {
      component.removePicture();
      expect(component.noPicture).toBeTrue();
      expect(component.picture).toContain('no-photo.png');
    });

    it('should read file as data URL when file is selected', fakeAsync(() => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      const mockFileList = {
        0: mockFile,
        length: 1,
        item: () => mockFile
      } as unknown as FileList;

      const mockEvent = {
        target: {
          files: mockFileList
        }
      } as unknown as Event;

      component.onFileSelect(mockEvent);
      tick(100);

      expect(component.noPicture).toBeFalse();
    }));
  });

  describe('Profile Edit', () => {
    it('should update first name when input changes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstNameInput = compiled.querySelector('[data-testid="first-name-input"]') as HTMLInputElement;
      
      firstNameInput.value = 'John';
      firstNameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      expect(component.firstName).toBe('John');
    });

    it('should update department when select changes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const departmentSelect = compiled.querySelector('[data-testid="department-select"]') as HTMLSelectElement;
      
      departmentSelect.value = 'Sales';
      departmentSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      
      expect(component.department).toBe('Sales');
    });

    it('should toggle notification switch when clicked', () => {
      const initialValue = component.switches[0];
      component.onSwitchChange(0);
      expect(component.switches[0]).toBe(!initialValue);
    });

    it('should unconnect social profile when unconnect is called', () => {
      const socialProfile = component.socialProfiles[0];
      expect(socialProfile.href).toBeTruthy();
      
      component.unconnect(socialProfile);
      expect(socialProfile.href).toBeUndefined();
    });

    it('should open modal when showModal is called for unconnected profile', () => {
      const unconnectedProfile = component.socialProfiles.find(p => !p.href);
      if (unconnectedProfile) {
        component.showModal(unconnectedProfile);
        expect(modalServiceSpy.open).toHaveBeenCalled();
      }
    });

    it('should update social profile href when modal returns link', fakeAsync(() => {
      const testLink = 'https://example.com/profile';
      modalServiceSpy.open.and.returnValue({
        close: jasmine.createSpy('close'),
        afterClosed: () => of(testLink)
      });

      const unconnectedProfile = component.socialProfiles.find(p => !p.href);
      if (unconnectedProfile) {
        component.showModal(unconnectedProfile);
        tick();
        expect(unconnectedProfile.href).toBe(testLink);
      }
    }));

    it('should have all department options available', () => {
      expect(component.departments).toEqual([
        'Web Development',
        'System Development',
        'Sales',
        'Human Resources'
      ]);
    });

    it('should have all office location options available', () => {
      expect(component.officeLocations).toEqual([
        'San Francisco',
        'London',
        'Minsk',
        'Tokio'
      ]);
    });

    it('should call updateProfile when Update Profile button is clicked', () => {
      spyOn(component, 'updateProfile');
      const compiled = fixture.nativeElement as HTMLElement;
      const updateButton = compiled.querySelector('[data-testid="update-profile-btn"]') as HTMLButtonElement;
      
      updateButton.click();
      expect(component.updateProfile).toHaveBeenCalled();
    });
  });

  describe('Parity with Legacy', () => {
    it('should have same initial social profiles as legacy', () => {
      const expectedProfiles = [
        { name: 'Facebook', icon: 'socicon-facebook', hasHref: true },
        { name: 'Twitter', icon: 'socicon-twitter', hasHref: true },
        { name: 'Google', icon: 'socicon-google', hasHref: false },
        { name: 'LinkedIn', icon: 'socicon-linkedin', hasHref: true },
        { name: 'GitHub', icon: 'socicon-github', hasHref: true },
        { name: 'StackOverflow', icon: 'socicon-stackoverflow', hasHref: false },
        { name: 'Dribbble', icon: 'socicon-dribble', hasHref: false },
        { name: 'Behance', icon: 'socicon-behace', hasHref: false }
      ];

      expectedProfiles.forEach((expected, index) => {
        const actual = component.socialProfiles[index];
        expect(actual.name).toBe(expected.name);
        expect(actual.icon).toBe(expected.icon);
        expect(!!actual.href).toBe(expected.hasHref);
      });
    });

    it('should have same initial switch values as legacy', () => {
      expect(component.switches).toEqual([true, true, false, true, true, false]);
    });

    it('should have same default profile values as legacy', () => {
      expect(component.firstName).toBe('Anastasiya');
      expect(component.lastName).toBe('');
      expect(component.department).toBe('Web Development');
      expect(component.occupation).toBe('Front End Web Developer');
      expect(component.email).toBe('contact@akveo.com');
      expect(component.phone).toBe('+1 (23) 456 7890');
      expect(component.officeLocation).toBe('San Francisco');
      expect(component.room).toBe('303');
    });
  });
});
