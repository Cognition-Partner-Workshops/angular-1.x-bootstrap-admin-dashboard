import { Component, ViewEncapsulation } from '@angular/core';
import { AppImagePipe, BaPanelComponent } from '../../../theme';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [BaPanelComponent, AppImagePipe],
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss', './typography-extra.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TypographyComponent {}
