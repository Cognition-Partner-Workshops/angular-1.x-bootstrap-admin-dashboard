import { Component, Injectable, signal } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatState {
  readonly format = signal('dd-MMMM-yyyy');
}

@Injectable()
export class FormDateParserFormatter extends NgbDateParserFormatter {
  constructor(private readonly state: FormatState) { super(); }

  format(date: NgbDateStruct | null): string {
    if (!date) return '';
    return formatDate(new Date(date.year, date.month - 1, date.day), this.state.format(), 'en-US');
  }

  parse(value: string): NgbDateStruct | null {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
}

@Component({
  selector: 'app-datepickers',
  standalone: true,
  imports: [FormsModule, DatePipe, NgbDatepickerModule],
  providers: [
    FormatState,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: NgbDateParserFormatter, useClass: FormDateParserFormatter },
  ],
  templateUrl: './datepickers.component.html',
})
export class DatepickersComponent {
  dt = new Date();
  popupDt = new Date();
  readonly formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  format = this.formats[0];

  constructor(private readonly formatState: FormatState) {}

  setFormat(value: string): void {
    this.format = value;
    this.formatState.format.set(value);
  }
}
