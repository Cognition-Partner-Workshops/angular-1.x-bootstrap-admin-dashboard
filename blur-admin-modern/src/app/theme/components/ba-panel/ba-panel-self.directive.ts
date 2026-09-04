import { Directive, HostBinding, input } from '@angular/core';

@Directive({ selector: '[baPanelSelf]', standalone: true })
export class BaPanelSelfDirective {
  readonly baPanelClass = input('');
  @HostBinding('class.panel') readonly panel = true;
  @HostBinding('class.panel-white') readonly panelWhite = true;
  @HostBinding('class') get customClasses(): string {
    return this.baPanelClass();
  }
}
