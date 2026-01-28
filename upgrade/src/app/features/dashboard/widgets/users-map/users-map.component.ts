import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountryData {
  title: string;
  id: string;
  users: string;
  color: string;
  groupId: string;
}

interface LegendItem {
  title: string;
  color: string;
}

@Component({
  selector: 'app-users-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-map.component.html',
  styleUrl: './users-map.component.scss'
})
export class UsersMapComponent implements OnInit {
  countries: CountryData[] = [];
  legend: LegendItem[] = [];

  ngOnInit(): void {
    const primaryColor = '#209e91';
    const successLightColor = '#90caf9';
    const successColor = '#66bb6a';
    const dangerColor = '#e74c3c';

    this.countries = [
      { title: 'Austria', id: 'AT', users: '1 244', color: primaryColor, groupId: '1' },
      { title: 'Ireland', id: 'IE', users: '1 342', color: primaryColor, groupId: '1' },
      { title: 'Denmark', id: 'DK', users: '1 973', color: primaryColor, groupId: '1' },
      { title: 'Finland', id: 'FI', users: '1 573', color: primaryColor, groupId: '1' },
      { title: 'Sweden', id: 'SE', users: '1 084', color: primaryColor, groupId: '1' },
      { title: 'Great Britain', id: 'GB', users: '1 452', color: primaryColor, groupId: '1' },
      { title: 'Italy', id: 'IT', users: '1 321', color: primaryColor, groupId: '1' },
      { title: 'France', id: 'FR', users: '1 112', color: primaryColor, groupId: '1' },
      { title: 'Spain', id: 'ES', users: '1 865', color: primaryColor, groupId: '1' },
      { title: 'Greece', id: 'GR', users: '1 453', color: primaryColor, groupId: '1' },
      { title: 'Germany', id: 'DE', users: '1 957', color: primaryColor, groupId: '1' },
      { title: 'Belgium', id: 'BE', users: '1 011', color: primaryColor, groupId: '1' },
      { title: 'Netherlands', id: 'NL', users: '1 213', color: primaryColor, groupId: '1' },
      { title: 'Portugal', id: 'PT', users: '1 291', color: primaryColor, groupId: '1' },
      { title: 'Lithuania', id: 'LT', users: '567', color: successLightColor, groupId: '2' },
      { title: 'Latvia', id: 'LV', users: '589', color: successLightColor, groupId: '2' },
      { title: 'Czech Republic', id: 'CZ', users: '785', color: successLightColor, groupId: '2' },
      { title: 'Slovakia', id: 'SK', users: '965', color: successLightColor, groupId: '2' },
      { title: 'Estonia', id: 'EE', users: '685', color: successLightColor, groupId: '2' },
      { title: 'Hungary', id: 'HU', users: '854', color: successLightColor, groupId: '2' },
      { title: 'Poland', id: 'PL', users: '759', color: successLightColor, groupId: '2' },
      { title: 'Romania', id: 'RO', users: '302', color: successColor, groupId: '3' },
      { title: 'Bulgaria', id: 'BG', users: '102', color: successColor, groupId: '3' },
      { title: 'Slovenia', id: 'SI', users: '23', color: dangerColor, groupId: '4' },
      { title: 'Croatia', id: 'HR', users: '96', color: dangerColor, groupId: '4' }
    ];

    this.legend = [
      { title: 'over 1 000 users', color: primaryColor },
      { title: '500 - 1 000 users', color: successLightColor },
      { title: '100 - 500 users', color: successColor },
      { title: '0 - 100 users', color: dangerColor }
    ];
  }

  getCountriesByGroup(groupId: string): CountryData[] {
    return this.countries.filter(c => c.groupId === groupId);
  }
}
