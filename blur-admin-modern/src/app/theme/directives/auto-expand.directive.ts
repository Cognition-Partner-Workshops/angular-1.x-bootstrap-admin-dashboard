import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({ selector: '[autoExpand]', standalone: true })
export class AutoExpandDirective implements AfterViewInit {
  constructor(
    private readonly element: ElementRef<HTMLTextAreaElement>,
    private readonly renderer: Renderer2,
  ) {}

  private resize(): void {
    const textarea = this.element.nativeElement;
    this.renderer.setStyle(textarea, 'height', '0px');
    this.renderer.setStyle(textarea, 'height', `${Math.max(16, textarea.scrollHeight)}px`);
  }

  @HostListener('keydown')
  onKeydown(): void {
    this.resize();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.resize());
  }
}
