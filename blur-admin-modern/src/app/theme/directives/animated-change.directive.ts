import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({ selector: '[animatedChange]', standalone: true })
export class AnimatedChangeDirective implements OnDestroy {
  @Input() newValue!: number;
  private startTimer?: ReturnType<typeof setTimeout>;
  private stepTimer?: ReturnType<typeof setInterval>;
  private arrowTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.startTimer = setTimeout(() => this.animate(), 3500);
  }

  private animate(): void {
    const host = this.element.nativeElement;
    let current = parseInt(host.textContent ?? '0', 10) || 0;
    const target = Number(this.newValue);
    const direction = target >= current ? 1 : -1;
    this.stepTimer = setInterval(() => {
      current += direction;
      host.textContent = String(current);
      if (current === target) {
        if (this.stepTimer) clearInterval(this.stepTimer);
        this.arrowTimer = setTimeout(() => {
          const icon = host.nextElementSibling?.querySelector('i');
          if (icon) this.renderer.addClass(icon, 'show-arr');
        }, 500);
      }
    }, 30);
  }

  ngOnDestroy(): void {
    if (this.startTimer) clearTimeout(this.startTimer);
    if (this.stepTimer) clearInterval(this.stepTimer);
    if (this.arrowTimer) clearTimeout(this.arrowTimer);
  }
}
