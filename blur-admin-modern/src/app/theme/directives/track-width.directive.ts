import { Directive, ElementRef, HostListener, OnInit, input, output } from '@angular/core';

@Directive({ selector: '[trackWidth]', standalone: true })
export class TrackWidthDirective implements OnInit {
  readonly minWidth = input(0);
  readonly trackWidthChange = output<boolean>();
  private previous?: boolean;

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.emitWidth();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.emitWidth();
  }

  private emitWidth(): void {
    const current = this.element.nativeElement.offsetWidth < this.minWidth();
    if (current !== this.previous) {
      this.previous = current;
      this.trackWidthChange.emit(current);
    }
  }
}
