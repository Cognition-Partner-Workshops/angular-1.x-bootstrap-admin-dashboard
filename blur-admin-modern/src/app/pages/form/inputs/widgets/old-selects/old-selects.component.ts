import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OldSelectItem { label: string; value: number; group?: string; }

@Component({
  selector: 'app-old-selects',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './old-selects.component.html',
})
export class OldSelectsComponent {
  standardSelectItems: OldSelectItem[] = [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }, { label: 'Option 3', value: 3 }, { label: 'Option 4', value: 4 }];
  selectWithSearchItems = [{ label: 'Hot Dog, Fries and a Soda', value: 1 }, { label: 'Burger, Shake and a Smile', value: 2 }, { label: 'Sugar, Spice and all things nice', value: 3 }, { label: 'Baby Back Ribs', value: 4 }];
  groupedSelectItems: OldSelectItem[] = [{ label: 'Group 1 - Option 1', value: 1, group: 'Group 1' }, { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' }, { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' }, { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }];
  standardSelected: OldSelectItem | null = null;
  searchSelectedItem: OldSelectItem | null = null;
  groupedSelectedItem: OldSelectItem | null = null;
  optionTypesSelected: string | null = null;
  disabledSelected: string | null = null;
  dividerSelected: string | null = null;
  coloredSelections: Record<string, string | null> = {
    primary: null,
    success: null,
    warning: null,
    info: null,
    danger: null,
    inverse: null,
  };
  multipleSelectedItems: OldSelectItem[] = []; multipleSelectedItems2: OldSelectItem[] = [];
}
