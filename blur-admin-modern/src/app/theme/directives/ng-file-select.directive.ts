import { Directive, HostListener, output } from '@angular/core';

@Directive({ selector: '[ngFileSelect]', standalone: true })
export class NgFileSelectDirective {
  readonly fileSelect = output<File>();

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.fileSelect.emit(input.files[0]);
  }
}
