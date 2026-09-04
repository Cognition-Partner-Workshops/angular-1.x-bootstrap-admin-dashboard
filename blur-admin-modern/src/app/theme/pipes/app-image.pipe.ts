import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../layout-paths';

@Pipe({ name: 'appImage', standalone: true, pure: true })
export class AppImagePipe implements PipeTransform {
  transform(input: string): string {
    return LAYOUT_PATHS.images.root + input;
  }
}
