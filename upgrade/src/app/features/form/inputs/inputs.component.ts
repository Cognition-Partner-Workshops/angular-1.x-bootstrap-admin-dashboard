import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaPanelComponent } from '../../../shared/components/ba-panel';

interface SelectOption {
  label: string;
  value: number;
  group?: string;
}

interface GroupedByOption {
  name: string;
  country: string;
}

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, BaPanelComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  switches = {
    s1: true,
    s2: false,
    s3: true,
    s4: true,
    s5: false
  };

  tags = {
    primary: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'],
    warning: ['Minsk', 'Prague', 'Vilnius', 'Warsaw'],
    danger: ['London', 'Berlin', 'Paris', 'Rome', 'Munich']
  };

  newTag = {
    primary: '',
    warning: '',
    danger: ''
  };

  checkboxes = {
    check1: false,
    check2: false,
    check3: false
  };

  radioValue = '';

  selectedItem: SelectOption | null = null;
  standardSelectItems: SelectOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
  ];

  withSearchItem: SelectOption | null = null;
  selectWithSearchItems: SelectOption[] = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 }
  ];
  searchTerm = '';

  groupedItem: SelectOption | null = null;
  groupedSelectItems: SelectOption[] = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }
  ];

  groupedByItem: GroupedByOption | null = null;
  groupedBySelectItems: GroupedByOption[] = [
    { name: 'Adam', country: 'United States' },
    { name: 'Amalie', country: 'Argentina' },
    { name: 'Estefania', country: 'Argentina' },
    { name: 'Adrian', country: 'Ecuador' },
    { name: 'Wladimir', country: 'Ecuador' },
    { name: 'Samantha', country: 'United States' },
    { name: 'Nicole', country: 'Colombia' },
    { name: 'Natasha', country: 'Ecuador' },
    { name: 'Michael', country: 'Colombia' },
    { name: 'Nicolas', country: 'Colombia' }
  ];

  multipleItems: SelectOption[] = [];
  multipleSelectItems: SelectOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
    { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 },
    { label: 'Option 8', value: 8 }
  ];

  withDeleteItems: SelectOption[] = [];
  withDeleteSelectItems: SelectOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
    { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 },
    { label: 'Option 8', value: 8 }
  ];

  dropdownOpen: { [key: string]: boolean } = {};

  toggleSwitch(key: keyof typeof this.switches): void {
    this.switches[key] = !this.switches[key];
  }

  addTag(color: 'primary' | 'warning' | 'danger', event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tag = this.newTag[color].trim();
      if (tag && !this.tags[color].includes(tag)) {
        this.tags[color].push(tag);
        this.newTag[color] = '';
      }
    }
  }

  removeTag(color: 'primary' | 'warning' | 'danger', index: number): void {
    this.tags[color].splice(index, 1);
  }

  toggleDropdown(name: string): void {
    Object.keys(this.dropdownOpen).forEach(key => {
      if (key !== name) {
        this.dropdownOpen[key] = false;
      }
    });
    this.dropdownOpen[name] = !this.dropdownOpen[name];
  }

  closeDropdown(name: string): void {
    this.dropdownOpen[name] = false;
  }

  selectOption(name: string, option: SelectOption): void {
    switch (name) {
      case 'standard':
        this.selectedItem = option;
        break;
      case 'withSearch':
        this.withSearchItem = option;
        this.searchTerm = '';
        break;
      case 'grouped':
        this.groupedItem = option;
        break;
    }
    this.closeDropdown(name);
  }

  selectGroupedByOption(option: GroupedByOption): void {
    this.groupedByItem = option;
    this.closeDropdown('groupedBy');
  }

  toggleMultipleOption(option: SelectOption): void {
    const index = this.multipleItems.findIndex(item => item.value === option.value);
    if (index > -1) {
      this.multipleItems.splice(index, 1);
    } else {
      this.multipleItems.push(option);
    }
  }

  isMultipleSelected(option: SelectOption): boolean {
    return this.multipleItems.some(item => item.value === option.value);
  }

  removeMultipleItem(option: SelectOption): void {
    const index = this.multipleItems.findIndex(item => item.value === option.value);
    if (index > -1) {
      this.multipleItems.splice(index, 1);
    }
  }

  toggleWithDeleteOption(option: SelectOption): void {
    const index = this.withDeleteItems.findIndex(item => item.value === option.value);
    if (index > -1) {
      this.withDeleteItems.splice(index, 1);
    } else {
      this.withDeleteItems.push(option);
    }
  }

  isWithDeleteSelected(option: SelectOption): boolean {
    return this.withDeleteItems.some(item => item.value === option.value);
  }

  removeWithDeleteItem(option: SelectOption): void {
    const index = this.withDeleteItems.findIndex(item => item.value === option.value);
    if (index > -1) {
      this.withDeleteItems.splice(index, 1);
    }
  }

  clearWithDeleteItems(): void {
    this.withDeleteItems = [];
  }

  getFilteredSearchItems(): SelectOption[] {
    if (!this.searchTerm) {
      return this.selectWithSearchItems;
    }
    return this.selectWithSearchItems.filter(item =>
      item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getGroupedItems(): { group: string; items: SelectOption[] }[] {
    const groups: { [key: string]: SelectOption[] } = {};
    this.groupedSelectItems.forEach(item => {
      const group = item.group || 'Other';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });
    return Object.keys(groups).map(group => ({ group, items: groups[group] }));
  }

  getGroupedByItems(): { group: string; items: GroupedByOption[] }[] {
    const groups: { [key: string]: GroupedByOption[] } = {};
    this.groupedBySelectItems.forEach(item => {
      const firstChar = item.name[0].toUpperCase();
      let group: string;
      if (firstChar >= 'A' && firstChar <= 'M') {
        group = 'From A - M';
      } else {
        group = 'From N - Z';
      }
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });
    return Object.keys(groups).map(group => ({ group, items: groups[group] }));
  }
}
