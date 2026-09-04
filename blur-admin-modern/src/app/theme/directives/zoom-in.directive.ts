import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { BaPageLoadingService } from '../services/ba-page-loading.service';

@Directive({ selector: '[zoomIn]', standalone: true })
export class ZoomInDirective implements OnInit, OnDestroy {
  private readonly pageLoading = inject(BaPageLoadingService);
  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  zoomInDelay = 1000;

  ngOnInit(): void {
    const delay = this.pageLoading.pageFinishedLoading() ? 100 : this.zoomInDelay;
    this.timer = setTimeout(() => {
      this.renderer.removeClass(this.element.nativeElement, 'full-invisible');
      this.renderer.addClass(this.element.nativeElement, 'animated');
      this.renderer.addClass(this.element.nativeElement, 'zoomIn');
    }, delay);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
