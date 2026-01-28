import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

interface SliderConfig {
  id: string;
  title: string;
  value: number;
  highValue?: number;
  options: Options;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  sliders: SliderConfig[] = [
    {
      id: 'basic',
      title: 'Basic',
      value: 45,
      options: {
        floor: 0,
        ceil: 100,
        showTicks: false
      }
    },
    {
      id: 'prefix',
      title: 'With prefix',
      value: 420,
      options: {
        floor: 100,
        ceil: 1200,
        showTicks: true,
        tickStep: 100,
        translate: (value: number): string => {
          return '$' + value;
        }
      }
    },
    {
      id: 'postfix',
      title: 'With postfix',
      value: 36,
      options: {
        floor: -90,
        ceil: 90,
        showTicks: true,
        tickStep: 30,
        translate: (value: number): string => {
          return value + '\u00B0';
        }
      }
    },
    {
      id: 'range',
      title: 'Two way range',
      value: 420,
      highValue: 900,
      options: {
        floor: 100,
        ceil: 1200,
        showTicks: true,
        tickStep: 100
      }
    },
    {
      id: 'steps',
      title: 'With Steps',
      value: 300,
      options: {
        floor: 0,
        ceil: 1000,
        step: 50,
        showTicks: true,
        tickStep: 100
      }
    },
    {
      id: 'prettify',
      title: 'Decorating numbers',
      value: 300000,
      options: {
        floor: 0,
        ceil: 1000000,
        step: 1000,
        showTicks: true,
        tickStep: 200000,
        translate: (value: number): string => {
          return value.toLocaleString('de-DE');
        }
      }
    },
    {
      id: 'custom-values',
      title: 'Using custom values array',
      value: 5,
      options: {
        showTicks: true,
        stepsArray: [
          { value: 0, legend: 'January' },
          { value: 1, legend: 'February' },
          { value: 2, legend: 'March' },
          { value: 3, legend: 'April' },
          { value: 4, legend: 'May' },
          { value: 5, legend: 'June' },
          { value: 6, legend: 'July' },
          { value: 7, legend: 'August' },
          { value: 8, legend: 'September' },
          { value: 9, legend: 'October' },
          { value: 10, legend: 'November' },
          { value: 11, legend: 'December' }
        ]
      }
    },
    {
      id: 'disabled',
      title: 'Disabled',
      value: 45,
      options: {
        floor: 0,
        ceil: 100,
        disabled: true,
        showTicks: false
      }
    }
  ];

  onValueChange(sliderId: string, value: number): void {
    const slider = this.sliders.find(s => s.id === sliderId);
    if (slider) {
      slider.value = value;
    }
  }

  onHighValueChange(sliderId: string, highValue: number): void {
    const slider = this.sliders.find(s => s.id === sliderId);
    if (slider) {
      slider.highValue = highValue;
    }
  }
}
