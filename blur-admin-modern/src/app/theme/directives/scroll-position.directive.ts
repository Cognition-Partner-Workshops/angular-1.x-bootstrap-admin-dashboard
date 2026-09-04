import { Directive, HostListener, OnInit, input, output } from '@angular/core';

@Directive({ selector: '[scrollPosition]', standalone: true })
export class ScrollPositionDirective implements OnInit {
  readonly maxHeight = input(0);
  readonly scrollPositionChange = output<boolean>();
  private previous?: boolean;

  ngOnInit(): void {
    this.emitPosition();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.emitPosition();
  }

  private emitPosition(): void {
    const current = window.scrollY > this.maxHeight();
    if (current !== this.previous) {
      this.previous = current;
      this.scrollPositionChange.emit(current);
    }
  }
}
