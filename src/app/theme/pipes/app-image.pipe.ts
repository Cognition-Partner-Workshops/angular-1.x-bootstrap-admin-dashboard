import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../services/layout.constants';

@Pipe({ name: 'appImage', standalone: true })
export class AppImagePipe implements PipeTransform {
  transform(src: string): string {
    return LAYOUT_PATHS.images.root + 'app/' + src;
  }
}
