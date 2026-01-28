import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-app.component.html',
  styleUrl: './popular-app.component.scss'
})
export class PopularAppComponent {
  appName = 'Super App';
  appCost = '175$';
  totalVisits = '47,512';
  newVisits = '9,217';
  sales = '2,928';
}
