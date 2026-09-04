import { Component } from '@angular/core';
import { TagsInputComponent } from './tags-input.component';

@Component({ selector: 'app-tags-input-panel', standalone: true, imports: [TagsInputComponent], template: '<app-tags-input tagStyle="primary" [tags]="primary" /><app-tags-input tagStyle="warning" [tags]="warning" /><app-tags-input tagStyle="danger" [tags]="danger" />' })
export class TagsInputPanelComponent {
  primary = ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'];
  warning = ['Minsk', 'Prague', 'Vilnius', 'Warsaw'];
  danger = ['London', 'Berlin', 'Paris', 'Rome', 'Munich'];
}
