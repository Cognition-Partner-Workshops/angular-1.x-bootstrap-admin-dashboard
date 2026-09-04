import { Component, input } from '@angular/core';
import { SMART_TABLE_DATA, TableRow } from '../../tables.data';

@Component({
  selector: 'app-striped-rows',
  standalone: true,
  templateUrl: './striped-rows.component.html',
})
export class StripedRowsComponent {
  readonly rows = input<TableRow[]>(SMART_TABLE_DATA);
}
