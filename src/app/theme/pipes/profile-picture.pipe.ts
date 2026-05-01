import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../services/layout.constants';

@Pipe({ name: 'profilePicture', standalone: true })
export class ProfilePicturePipe implements PipeTransform {
  transform(name: string): string {
    return LAYOUT_PATHS.images.profile + name + '.png';
  }
}
