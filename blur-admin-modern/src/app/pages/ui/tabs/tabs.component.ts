import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { ContextualAccordionComponent } from './contextual-accordion.component';
import { MainTabsComponent } from './main-tabs.component';
import { SampleAccordionComponent } from './sample-accordion.component';
import { SideTabsComponent } from './side-tabs.component';

@Component({
  selector: 'app-ui-tabs',
  standalone: true,
  imports: [BaPanelComponent, MainTabsComponent, SideTabsComponent, SampleAccordionComponent, ContextualAccordionComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {}
