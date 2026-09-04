import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../theme';
import { EditableRowTableComponent } from './widgets/editable-row-table/editable-row-table.component';
import { EditableTableComponent } from './widgets/editable-table/editable-table.component';
import { SmartTableComponent } from './widgets/smart-table/smart-table.component';

@Component({
  selector: 'app-smart-tables',
  standalone: true,
  imports: [BaPanelComponent, EditableRowTableComponent, EditableTableComponent, SmartTableComponent],
  templateUrl: './smart-tables.component.html',
  styleUrls: ['./tables.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartTablesComponent {}
