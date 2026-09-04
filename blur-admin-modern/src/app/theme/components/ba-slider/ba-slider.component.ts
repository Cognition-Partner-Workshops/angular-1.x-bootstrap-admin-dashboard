import { Component, computed, effect, input, output } from '@angular/core';
import { ChangeContext, LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'ba-slider',
  standalone: true,
  imports: [NgxSliderModule],
  template: `
    <ngx-slider
      [(value)]="fromValue"
      [(highValue)]="toValue"
      [options]="options()"
      (userChange)="change($event)"
      (userChangeEnd)="finish($event)">
    </ngx-slider>
  `,
})
export class BaSliderComponent {
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly type = input<'single' | 'double'>('single');
  readonly from = input(0);
  readonly to = input(100);
  readonly prefix = input('');
  readonly postfix = input('');
  readonly maxPostfix = input('');
  readonly grid = input(false);
  readonly disable = input(false);
  readonly hideMinMax = input(false);
  readonly hideFromTo = input(false);
  readonly fromChange = output<number>();
  readonly toChange = output<number>();
  readonly onChange = output<ChangeContext>();
  readonly onFinish = output<ChangeContext>();

  fromValue = this.from();
  toValue = this.to();

  constructor() {
    effect(() => {
      this.fromValue = this.from();
      this.toValue = this.to();
    });
  }

  readonly options = computed<Options>(() => ({
    floor: this.min(),
    ceil: this.max(),
    step: this.step(),
    showTicks: this.grid(),
    disabled: this.disable(),
    hideLimitLabels: this.hideMinMax(),
    hidePointerLabels: this.hideFromTo(),
    translate: (value: number, label: LabelType): string =>
      `${this.prefix()}${value}${label === LabelType.High && this.maxPostfix() ? this.maxPostfix() : this.postfix()}`,
  }));

  change(event: ChangeContext): void {
    this.fromChange.emit(this.fromValue);
    if (this.type() === 'double') this.toChange.emit(this.toValue);
    this.onChange.emit(event);
  }

  finish(event: ChangeContext): void {
    this.onFinish.emit(event);
  }
}
