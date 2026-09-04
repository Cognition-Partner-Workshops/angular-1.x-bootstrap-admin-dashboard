import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BaPanelComponent, KameleonImgPipe } from '../../../theme';
@Component({ selector: 'app-ui-side-tabs', standalone: true, imports: [BaPanelComponent, NgbNavModule, KameleonImgPipe], templateUrl: './side-tabs.component.html' })
export class SideTabsComponent { leftTab = 1; rightTab = 1; }
