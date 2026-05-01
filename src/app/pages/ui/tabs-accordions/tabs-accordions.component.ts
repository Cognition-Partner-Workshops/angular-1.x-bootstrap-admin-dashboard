import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-tabs-accordions',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './tabs-accordions.component.html',
  styleUrl: './tabs-accordions.component.scss',
})
export class TabsAccordionsComponent {
  activeTab = 0;
  openAccordion = 0;

  tabs = [
    { title: 'Home', content: 'Raw denim you probably have not heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.' },
    { title: 'Profile', content: 'Food truck fixie locavore, accusamus mcsweeney s marfa nulla single-origin coffee squid.' },
    { title: 'Messages', content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney s organic lomo retro fanny pack lo-fi farm-to-table readymade.' },
  ];

  accordions = [
    { title: 'Collapsible Group Item #1', content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.' },
    { title: 'Collapsible Group Item #2', content: 'Food truck fixie locavore, accusamus mcsweeney s marfa nulla single-origin coffee squid.' },
    { title: 'Collapsible Group Item #3', content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney s organic lomo retro.' },
  ];

  toggleAccordion(index: number): void {
    this.openAccordion = this.openAccordion === index ? -1 : index;
  }
}
