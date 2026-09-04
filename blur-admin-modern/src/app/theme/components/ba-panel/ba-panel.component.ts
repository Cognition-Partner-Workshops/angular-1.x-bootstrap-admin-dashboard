import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaConfigService } from '../../ba-config.service';
import { ZoomInDirective } from '../../directives/zoom-in.directive';
import { BaPanelBlurDirective } from './ba-panel-blur.directive';

@Component({
  selector: 'ba-panel, [baPanel]',
  standalone: true,
  imports: [NgClass, ZoomInDirective, BaPanelBlurDirective],
  template: `
    <div class="panel full-invisible" [class.panel-blur]="isBlur()" [ngClass]="baPanelClass()" zoomIn [baPanelBlur]="isBlur()">
      @if (title()) {
        <div class="panel-heading clearfix"><h3 class="panel-title">{{ title() }}</h3></div>
      }
      <div class="panel-body"><ng-content /></div>
    </div>
  `,
})
export class BaPanelComponent {
  readonly title = input<string>();
  readonly baPanelClass = input('');
  readonly blur = input<boolean | undefined>();
  private readonly config = inject(BaConfigService);

  isBlur(): boolean {
    return this.blur() ?? this.config.theme.blur;
  }
}
