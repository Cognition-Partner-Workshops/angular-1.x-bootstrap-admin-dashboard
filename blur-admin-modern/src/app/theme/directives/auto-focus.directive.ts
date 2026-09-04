import { Directive, ElementRef, HostListener, OnDestroy, effect, input, output } from '@angular/core';

@Directive({ selector: '[autoFocus]', standalone: true })
export class AutoFocusDirective implements OnDestroy {
  readonly autoFocus = input<boolean>();
  readonly autoFocusChange = output<boolean>();
  private timer?: ReturnType<typeof setTimeout>;

  constructor(private readonly element: ElementRef<HTMLElement>) {
    effect(() => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      if (this.autoFocus()) {
        this.timer = setTimeout(() => {
          this.element.nativeElement.focus();
          (this.element.nativeElement as HTMLInputElement).select?.();
        });
      }
    });
  }

  @HostListener('blur')
  onBlur(): void {
    this.autoFocusChange.emit(false);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
