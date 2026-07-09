import { Component } from '@angular/core';

/**
 * Modern standalone port of the legacy AngularJS `popularApp` dashboard widget.
 *
 * A static info card: app logo + name, most-popular-app cost row, and a row of
 * three stats (Total Visits / New Visits / Sales). Renders only the widget's
 * inner content; the surrounding panel is provided by the integration step.
 */
@Component({
  selector: 'app-popular-app',
  standalone: true,
  imports: [],
  templateUrl: './popular-app.component.html',
  styleUrl: './popular-app.component.scss'
})
export class PopularAppComponent {}
