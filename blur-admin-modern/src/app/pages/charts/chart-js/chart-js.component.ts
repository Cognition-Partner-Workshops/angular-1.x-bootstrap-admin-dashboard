import { Component } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaPanelComponent } from '../../../theme';
import { ChartJs1DComponent } from './chart-js-1d.component';
import { ChartJs2DComponent } from './chart-js-2d.component';
import { ChartJsWaveComponent } from './chart-js-wave.component';

@Component({
  selector: 'app-chart-js',
  standalone: true,
  imports: [BaPanelComponent, ChartJs1DComponent, ChartJs2DComponent, ChartJsWaveComponent],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './chart-js.component.html',
})
export class ChartJsComponent {}
