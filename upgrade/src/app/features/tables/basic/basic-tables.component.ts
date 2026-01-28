import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent, BaPanelComponent } from '../../../shared/components';

interface MetricsData {
  image: string;
  browser: string;
  visits: string;
  isVisitsUp: boolean;
  purchases: string;
  isPurchasesUp: boolean;
  percent: string;
  isPercentUp: boolean;
}

interface PeopleData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: string;
  status: string;
}

interface SmartTableData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: string | number;
}

interface ContextualRow {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  rowClass: string;
}

@Component({
  selector: 'app-basic-tables',
  standalone: true,
  imports: [CommonModule, PageContainerComponent, BaPanelComponent],
  templateUrl: './basic-tables.component.html',
  styleUrl: './basic-tables.component.scss'
})
export class BasicTablesComponent {
  metricsTableData: MetricsData[] = [
    {
      image: 'assets/img/browsers/chrome.svg',
      browser: 'Google Chrome',
      visits: '10,392',
      isVisitsUp: true,
      purchases: '4,214',
      isPurchasesUp: true,
      percent: '45%',
      isPercentUp: true
    },
    {
      image: 'assets/img/browsers/firefox.svg',
      browser: 'Mozilla Firefox',
      visits: '7,873',
      isVisitsUp: true,
      purchases: '3,031',
      isPurchasesUp: false,
      percent: '28%',
      isPercentUp: true
    },
    {
      image: 'assets/img/browsers/ie.svg',
      browser: 'Internet Explorer',
      visits: '5,890',
      isVisitsUp: false,
      purchases: '2,102',
      isPurchasesUp: false,
      percent: '17%',
      isPercentUp: false
    },
    {
      image: 'assets/img/browsers/safari.svg',
      browser: 'Safari',
      visits: '4,001',
      isVisitsUp: false,
      purchases: '1,001',
      isPurchasesUp: false,
      percent: '14%',
      isPercentUp: true
    },
    {
      image: 'assets/img/browsers/opera.svg',
      browser: 'Opera',
      visits: '1,833',
      isVisitsUp: true,
      purchases: '83',
      isPurchasesUp: true,
      percent: '5%',
      isPercentUp: false
    }
  ];

  peopleTableData: PeopleData[] = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      username: '@mdo',
      email: 'mdo@gmail.com',
      age: '28',
      status: 'info'
    },
    {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      username: '@fat',
      email: 'fat@yandex.ru',
      age: '45',
      status: 'primary'
    },
    {
      id: 3,
      firstName: 'Larry',
      lastName: 'Bird',
      username: '@twitter',
      email: 'twitter@outlook.com',
      age: '18',
      status: 'success'
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Snow',
      username: '@snow',
      email: 'snow@gmail.com',
      age: '20',
      status: 'danger'
    },
    {
      id: 5,
      firstName: 'Jack',
      lastName: 'Sparrow',
      username: '@jack',
      email: 'jack@yandex.ru',
      age: '30',
      status: 'warning'
    }
  ];

  smartTableData: SmartTableData[] = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: '28' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: '45' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: '18' },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: '20' },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: '30' },
    { id: 6, firstName: 'Ann', lastName: 'Smith', username: '@ann', email: 'ann@gmail.com', age: '21' },
    { id: 7, firstName: 'Barbara', lastName: 'Black', username: '@barbara', email: 'barbara@yandex.ru', age: '43' },
    { id: 8, firstName: 'Sevan', lastName: 'Bagrat', username: '@sevan', email: 'sevan@outlook.com', age: '13' },
    { id: 9, firstName: 'Ruben', lastName: 'Vardan', username: '@ruben', email: 'ruben@gmail.com', age: '22' },
    { id: 10, firstName: 'Karen', lastName: 'Sevan', username: '@karen', email: 'karen@yandex.ru', age: '33' }
  ];

  contextualTableData: ContextualRow[] = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28, rowClass: 'primary' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45, rowClass: 'success' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18, rowClass: 'warning' },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20, rowClass: 'danger' },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30, rowClass: 'info' }
  ];

  responsiveTableData: ContextualRow[] = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28, rowClass: '' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45, rowClass: '' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18, rowClass: '' },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20, rowClass: '' },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30, rowClass: '' }
  ];
}
