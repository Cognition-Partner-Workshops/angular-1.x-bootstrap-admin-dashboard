import { Component, ViewEncapsulation } from '@angular/core';
import { AppImagePipe } from '../../../theme';

@Component({
  selector: 'popular-app',
  standalone: true,
  imports: [AppImagePipe],
  templateUrl: './popular-app.component.html',
  styleUrl: './popular-app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PopularAppComponent {
  readonly logo = 'app/my-app-logo.png';
}
