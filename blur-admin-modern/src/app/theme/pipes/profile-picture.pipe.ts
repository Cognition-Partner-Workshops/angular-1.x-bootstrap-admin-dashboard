import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_PATHS } from '../layout-paths';

@Pipe({ name: 'profilePicture', standalone: true, pure: true })
export class ProfilePicturePipe implements PipeTransform {
  transform(input: string, ext?: string): string {
    return LAYOUT_PATHS.images.profile + input + '.' + (ext ?? 'png');
  }
}
