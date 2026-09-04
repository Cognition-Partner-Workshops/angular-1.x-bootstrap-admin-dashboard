import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AppImagePipe,
  BaPanelComponent,
  FileReaderService,
  NgFileSelectDirective,
  ProfilePicturePipe,
} from '../../theme';
import { ProfileModalComponent } from './profile-modal.component';

export interface SocialProfile {
  name: string;
  icon: string;
  href?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, BaPanelComponent, NgFileSelectDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('uploadFile') private uploadFile?: ElementRef<HTMLInputElement>;

  picture = new ProfilePicturePipe().transform('Nasta');
  noPicture = false;
  switches = [true, true, false, true, true, false];
  socialProfiles: SocialProfile[] = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/akveo/',
      icon: 'socicon-facebook',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/akveo_inc',
      icon: 'socicon-twitter',
    },
    {
      name: 'Google',
      icon: 'socicon-google',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/akveo',
      icon: 'socicon-linkedin',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/akveo',
      icon: 'socicon-github',
    },
    {
      name: 'StackOverflow',
      icon: 'socicon-stackoverflow',
    },
    {
      name: 'Dribbble',
      icon: 'socicon-dribble',
    },
    {
      name: 'Behance',
      icon: 'socicon-behace',
    },
  ];

  constructor(
    private readonly fileReader: FileReaderService,
    private readonly modal: NgbModal,
  ) {}

  removePicture(): void {
    this.picture = new AppImagePipe().transform('theme/no-photo.png');
    this.noPicture = true;
  }

  uploadPicture(): void {
    this.uploadFile?.nativeElement.click();
  }

  getFile(file: File): void {
    this.fileReader.readAsDataUrl(file).then((result) => {
      this.picture = result;
    });
  }

  unconnect(item: SocialProfile): void {
    item.href = undefined;
  }

  showModal(item: SocialProfile): void {
    this.modal.open(ProfileModalComponent, { animation: false }).result.then(
      (link) => item.href = link,
      () => {},
    );
  }
}
