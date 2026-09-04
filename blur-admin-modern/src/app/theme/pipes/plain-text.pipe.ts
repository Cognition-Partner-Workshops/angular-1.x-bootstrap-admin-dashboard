import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plainText', standalone: true, pure: true })
export class PlainTextPipe implements PipeTransform {
  transform(text: unknown): string {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}
