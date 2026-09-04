import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PEOPLE_TABLE_DATA, PersonRow } from '../../tables.data';

@Component({
  selector: 'app-condensed-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './condensed-table.component.html',
})
export class CondensedTableComponent {
  readonly rows = input<PersonRow[]>(PEOPLE_TABLE_DATA);
}
