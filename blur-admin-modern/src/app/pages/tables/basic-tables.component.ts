import { Component, ViewEncapsulation } from '@angular/core';
import { BaPanelComponent } from '../../theme';
import { BorderedTableComponent } from './widgets/bordered-table/bordered-table.component';
import { CondensedTableComponent } from './widgets/condensed-table/condensed-table.component';
import { ContextualTableComponent } from './widgets/contextual-table/contextual-table.component';
import { HoverRowsComponent } from './widgets/hover-rows/hover-rows.component';
import { ResponsiveTableComponent } from './widgets/responsive-table/responsive-table.component';
import { StripedRowsComponent } from './widgets/striped-rows/striped-rows.component';

@Component({
  selector: 'app-basic-tables',
  standalone: true,
  imports: [BaPanelComponent, HoverRowsComponent, BorderedTableComponent, CondensedTableComponent, StripedRowsComponent, ContextualTableComponent, ResponsiveTableComponent],
  templateUrl: './basic-tables.component.html',
  styleUrls: ['./tables.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicTablesComponent {}
