import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string;
  heading: string;
  content?: string;
  disabled?: boolean;
}

interface AccordionPanel {
  id: string;
  heading: string;
  content: string;
  isOpen: boolean;
  panelClass?: string;
  hasCustomHeading?: boolean;
  customHeadingHtml?: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  // Main horizontal tabs
  mainActiveTab = 0;
  mainTabs: Tab[] = [
    { id: 'start', heading: 'Start' },
    { id: 'getting-done', heading: 'Getting Done' },
    { id: 'dropdown', heading: 'Dropdown tab' }
  ];
  dropdownActiveTab = 1;
  dropdownOpen = false;

  // Left-aligned tabs
  leftActiveTab = 0;
  leftTabs: Tab[] = [
    { id: 'start', heading: 'Start' },
    { id: 'get-it-done', heading: 'Get it done' },
    { id: 'achieve', heading: 'Achieve' }
  ];

  // Right-aligned tabs
  rightActiveTab = 0;
  rightTabs: Tab[] = [
    { id: 'start', heading: 'Start' },
    { id: 'get-it-done', heading: 'Get it done' },
    { id: 'achieve', heading: 'Achieve' }
  ];

  // Sample accordion panels
  sampleAccordionPanels: AccordionPanel[] = [
    {
      id: 'static',
      heading: 'Static Header, initially expanded',
      content: 'This content is straight in the template.',
      isOpen: true,
      panelClass: 'panel-default'
    },
    {
      id: 'dynamic',
      heading: 'Dynamic Body Content',
      content: '',
      isOpen: false,
      panelClass: 'panel-default'
    },
    {
      id: 'custom',
      heading: 'Custom template',
      content: 'Hello',
      isOpen: false,
      panelClass: 'panel-default'
    },
    {
      id: 'markup',
      heading: '',
      content: 'This is just some content to illustrate fancy headings.',
      isOpen: false,
      panelClass: 'panel-default',
      hasCustomHeading: true,
      customHeadingHtml: 'I can have markup, too!'
    }
  ];

  // Contextual accordion panels
  contextualAccordionPanels: AccordionPanel[] = [
    {
      id: 'primary',
      heading: 'Primary',
      content: 'Primary',
      isOpen: false,
      panelClass: 'panel-primary'
    },
    {
      id: 'success',
      heading: 'Success',
      content: 'Success',
      isOpen: false,
      panelClass: 'panel-success'
    },
    {
      id: 'info',
      heading: 'Info',
      content: 'Info',
      isOpen: false,
      panelClass: 'panel-info'
    },
    {
      id: 'warning',
      heading: 'Warning',
      content: 'Warning',
      isOpen: false,
      panelClass: 'panel-warning'
    },
    {
      id: 'danger',
      heading: 'Danger',
      content: 'Danger',
      isOpen: false,
      panelClass: 'panel-danger'
    }
  ];

  selectMainTab(index: number): void {
    this.mainActiveTab = index;
    this.dropdownOpen = false;
  }

  selectDropdownTab(tabIndex: number): void {
    this.dropdownActiveTab = tabIndex;
    this.mainActiveTab = 2;
    this.dropdownOpen = false;
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLeftTab(index: number): void {
    this.leftActiveTab = index;
  }

  selectRightTab(index: number): void {
    this.rightActiveTab = index;
  }

  toggleAccordionPanel(panels: AccordionPanel[], index: number): void {
    panels[index].isOpen = !panels[index].isOpen;
  }

  getContextualIcon(panelId: string): string {
    const icons: Record<string, string> = {
      'primary': 'ion-heart',
      'success': 'ion-checkmark-round',
      'info': 'ion-information-circled',
      'warning': 'ion-alert',
      'danger': 'ion-nuclear'
    };
    return icons[panelId] || '';
  }
}
