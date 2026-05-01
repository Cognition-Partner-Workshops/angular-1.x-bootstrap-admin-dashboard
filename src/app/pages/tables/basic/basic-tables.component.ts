import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-basic-tables',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './basic-tables.component.html',
})
export class BasicTablesComponent {}
