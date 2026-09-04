import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { GroupSelectpickerOptionsPipe } from './group-selectpicker-options.pipe';

@Component({
  selector: 'app-selects',
  standalone: true,
  imports: [FormsModule, NgSelectModule, GroupSelectpickerOptionsPipe],
  templateUrl: './selects.component.html',
})
export class SelectsComponent implements AfterViewInit {
  @ViewChild('disabledSelect') disabledSelect?: NgSelectComponent;

  standardSelectItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ];
  selectWithSearchItems = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 },
  ];
  groupedSelectItems = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' },
  ];
  groupedBySelectItems = [
    { name: 'Adam', country: 'United States' },
    { name: 'Amalie', country: 'Argentina' },
    { name: 'Estefanía', country: 'Argentina' },
    { name: 'Adrian', country: 'Ecuador' },
    { name: 'Wladimir', country: 'Ecuador' },
    { name: 'Samantha', country: 'United States' },
    { name: 'Nicole', country: 'Colombia' },
    { name: 'Natasha', country: 'Ecuador' },
    { name: 'Michael', country: 'Colombia' },
    { name: 'Nicolás', country: 'Colombia' },
  ];
  multipleSelectItems = Array.from({ length: 8 }, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 }));
  withDeleteSelectItems = [...this.multipleSelectItems];
  standardItem: any; withSearchItem: any; groupedItem: any; groupedByItem: any; multipleItem: any[] = []; withDeleteItem: any[] = [];
  someGroupFn = (item: { name: string }) => item.name[0] <= 'M' ? 'From A - M' : 'From N - Z';

  ngAfterViewInit(): void {
    this.disabledSelect?.setDisabledState(true);
  }
}
