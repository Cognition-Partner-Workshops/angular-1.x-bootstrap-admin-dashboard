import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profile = {
    firstName: 'Kostya',
    lastName: 'Danovsky',
    username: 'kostya',
    email: 'kostya@email.com',
    bio: 'Developer, designer and overall a fun person to be around.',
  };

  socialLinks = [
    { icon: 'fa fa-facebook', url: '#', label: 'Facebook' },
    { icon: 'fa fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fa fa-google', url: '#', label: 'Google' },
    { icon: 'fa fa-linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'fa fa-github', url: '#', label: 'GitHub' },
    { icon: 'fa fa-stack-overflow', url: '#', label: 'StackOverflow' },
  ];
}
