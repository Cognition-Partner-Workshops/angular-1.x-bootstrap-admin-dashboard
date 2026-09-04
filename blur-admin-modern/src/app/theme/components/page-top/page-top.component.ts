import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePicturePipe } from '../../pipes/profile-picture.pipe';
import { ScrollPositionDirective } from '../../directives/scroll-position.directive';
import { BaSidebarService } from '../ba-sidebar/ba-sidebar.service';
import { MsgCenterComponent } from '../msg-center/msg-center.component';

@Component({
  selector: 'page-top',
  standalone: true,
  imports: [RouterLink, NgbDropdownModule, ProfilePicturePipe, ScrollPositionDirective, MsgCenterComponent],
  template: `
    <div class="page-top clearfix" scrollPosition [maxHeight]="50"
         (scrollPositionChange)="scrolled = $event" [class.scrolled]="scrolled">
      <a routerLink="/dashboard" class="al-logo clearfix"><span>Blur</span>Admin</a>
      <a href="javascript:void(0)" class="collapse-menu-link ion-navicon" (click)="toggleMenu($event)"></a>
      <div class="search"><i class="ion-ios-search-strong"></i><input id="searchInput" type="text" placeholder="Search for..."></div>
      <div class="user-profile clearfix">
        <div class="al-user-profile" ngbDropdown>
          <a ngbDropdownToggle class="profile-toggle-link"><img [src]="'Nasta' | profilePicture"></a>
          <ul ngbDropdownMenu class="top-dropdown-menu profile-dropdown">
            <li><i class="dropdown-arr"></i></li>
            <li><a routerLink="/profile"><i class="fa fa-user"></i>Profile</a></li>
            <li><a href="javascript:void(0)"><i class="fa fa-cog"></i>Settings</a></li>
            <li><a href="javascript:void(0)" class="signout"><i class="fa fa-power-off"></i>Sign out</a></li>
          </ul>
        </div>
        <msg-center />
      </div>
    </div>
  `,
})
export class PageTopComponent {
  private readonly sidebar = inject(BaSidebarService);
  scrolled = false;

  toggleMenu(event: Event & { $sidebarEventProcessed?: boolean }): void {
    event.preventDefault();
    event.$sidebarEventProcessed = true;
    this.sidebar.toggleMenuCollapsed();
  }
}
