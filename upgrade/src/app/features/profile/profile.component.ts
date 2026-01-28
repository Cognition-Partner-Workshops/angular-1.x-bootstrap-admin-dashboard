import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../shared/components/ba-panel';
import { ModalService, ModalRef } from '../../shared/components/modal';
import { ProfileModalComponent } from './profile-modal.component';

export interface SocialProfile {
  name: string;
  icon: string;
  href?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private modalService = inject(ModalService);

  @ViewChild('uploadFile') uploadFileInput!: ElementRef<HTMLInputElement>;

  picture = '';
  noPicture = false;

  firstName = 'Anastasiya';
  lastName = '';
  department = 'Web Development';
  occupation = 'Front End Web Developer';

  password = '12345678';
  confirmPassword = '';

  email = 'contact@akveo.com';
  phone = '+1 (23) 456 7890';
  officeLocation = 'San Francisco';
  room = '303';

  departments = ['Web Development', 'System Development', 'Sales', 'Human Resources'];
  officeLocations = ['San Francisco', 'London', 'Minsk', 'Tokio'];

  socialProfiles: SocialProfile[] = [];

  switches = [true, true, false, true, true, false];

  private readonly imagesRoot = 'assets/img/';
  private readonly profileImagesPath = 'assets/img/app/profile/';

  ngOnInit(): void {
    this.picture = this.getProfilePicture('Nasta');
    this.initSocialProfiles();
  }

  private getProfilePicture(name: string, ext = 'png'): string {
    return `${this.profileImagesPath}${name}.${ext}`;
  }

  private getAppImage(path: string): string {
    return `${this.imagesRoot}${path}`;
  }

  private initSocialProfiles(): void {
    this.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];
  }

  removePicture(): void {
    this.picture = this.getAppImage('theme/no-photo.png');
    this.noPicture = true;
  }

  uploadPicture(): void {
    this.uploadFileInput.nativeElement.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readFileAsDataUrl(file).then((result) => {
        this.picture = result;
        this.noPicture = false;
      });
    }
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  }

  unconnect(item: SocialProfile): void {
    item.href = undefined;
  }

  showModal(item: SocialProfile): void {
    const modalRef: ModalRef<string> = this.modalService.open(ProfileModalComponent, {
      title: 'Add Account',
      size: 'medium'
    });

    modalRef.afterClosed().subscribe((link) => {
      if (link) {
        item.href = link;
      }
    });
  }

  onSwitchChange(index: number): void {
    this.switches[index] = !this.switches[index];
  }

  updateProfile(): void {
    console.log('Profile updated');
  }
}
