import { Directive, ElementRef, HostListener, OnDestroy, Renderer2, effect, input, inject } from '@angular/core';
import { ThemeLayoutSettingsService } from '../../theme-layout-settings.service';
import { BaPanelBlurHelperService } from './ba-panel-blur-helper.service';

@Directive({ selector: '[baPanelBlur]', standalone: true })
export class BaPanelBlurDirective implements OnDestroy {
  readonly baPanelBlur = input(false);
  private readonly helper = inject(BaPanelBlurHelperService);
  private readonly settings = inject(ThemeLayoutSettingsService);
  private enabled = false;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {
    effect(() => {
      const shouldEnable = this.baPanelBlur() && !this.settings.mobile;
      if (shouldEnable && !this.enabled) {
        this.enabled = true;
        void this.helper.bodyBgLoad().then(() => this.recalculate());
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.enabled) this.recalculate();
  }

  private recalculate(): void {
    const size = this.helper.getBodyBgImageSizes();
    if (!size) return;
    this.renderer.setStyle(this.element.nativeElement, 'backgroundSize', `${Math.round(size.width)}px ${Math.round(size.height)}px`);
    this.renderer.setStyle(this.element.nativeElement, 'backgroundPosition', `${Math.floor(size.positionX)}px ${Math.floor(size.positionY)}px`);
  }

  ngOnDestroy(): void {
    this.enabled = false;
  }
}
