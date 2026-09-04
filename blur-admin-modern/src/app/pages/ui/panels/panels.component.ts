import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
@Component({ selector: 'app-ui-panels', standalone: true, imports: [BaPanelComponent], templateUrl: './panels.component.html', styleUrls: ['./panels.component.scss'], encapsulation: ViewEncapsulation.None })
export class PanelsComponent {}
