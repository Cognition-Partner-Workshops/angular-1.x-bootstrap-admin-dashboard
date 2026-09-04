import { Component } from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { KameleonImgPipe } from '../../../theme';

@Component({
  selector: 'app-ui-main-tabs',
  standalone: true,
  imports: [NgbNavModule, NgbDropdownModule, KameleonImgPipe],
  templateUrl: './main-tabs.component.html',
})
export class MainTabsComponent {
  activeTab = 1;
  dropdownTabActive = 1;
}
