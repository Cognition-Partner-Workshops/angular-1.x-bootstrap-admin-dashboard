import { Component, ViewEncapsulation } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { BaPanelComponent, BaSliderComponent } from '../../../theme';
@Component({ selector: 'app-ui-slider', standalone: true, imports: [BaPanelComponent, BaSliderComponent, NgxSliderModule], templateUrl: './slider.component.html', styleUrls: ['./slider.component.scss'], encapsulation: ViewEncapsulation.None })
export class SliderComponent {
  decoratedValue = 300000;
  monthValue = 5;
  readonly months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  readonly decoratedOptions: Options = { floor: 0, ceil: 1000000, step: 1000, showTicks: true, translate: (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') };
  readonly monthOptions: Options = { stepsArray: this.months.map((_, value) => ({ value })), showTicks: true, translate: (v) => this.months[v] };
}
