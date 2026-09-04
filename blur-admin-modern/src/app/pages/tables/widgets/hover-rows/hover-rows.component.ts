import { Component, input } from '@angular/core';
import { AppImagePipe } from '../../../../theme';
import { METRICS_TABLE_DATA, MetricsRow } from '../../tables.data';

@Component({
  selector: 'app-hover-rows',
  standalone: true,
  imports: [AppImagePipe],
  templateUrl: './hover-rows.component.html',
})
export class HoverRowsComponent {
  readonly rows = input<MetricsRow[]>(METRICS_TABLE_DATA);
}
