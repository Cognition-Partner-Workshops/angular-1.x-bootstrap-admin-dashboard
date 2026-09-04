import { Component, input } from '@angular/core';
import { AppImagePipe } from '../../../../theme';
import { METRICS_TABLE_DATA, MetricsRow } from '../../tables.data';

@Component({
  selector: 'app-bordered-table',
  standalone: true,
  imports: [AppImagePipe],
  templateUrl: './bordered-table.component.html',
})
export class BorderedTableComponent {
  readonly rows = input<MetricsRow[]>(METRICS_TABLE_DATA);
}
