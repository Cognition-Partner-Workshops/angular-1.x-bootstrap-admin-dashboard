import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../services/layout.constants';

@Pipe({ name: 'kameleonImg', standalone: true })
export class KameleonImgPipe implements PipeTransform {
  transform(src: string): string {
    return LAYOUT_PATHS.images.root + 'theme/icon/kameleon/' + src + '.svg';
  }
}
