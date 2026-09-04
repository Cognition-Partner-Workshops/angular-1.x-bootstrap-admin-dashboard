import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../layout-paths';

@Pipe({ name: 'kameleonImg', standalone: true, pure: true })
export class KameleonImgPipe implements PipeTransform {
  transform(input: string): string {
    return LAYOUT_PATHS.images.root + 'theme/icon/kameleon/' + input + '.svg';
  }
}
