/**
 * profilePicture — React utility replacing the AngularJS profilePicture filter.
 *
 * The original filter resolves a profile image name to its full path:
 *   {{ 'Nasta' | profilePicture }}       → 'assets/img/app/profile/Nasta.png'
 *   {{ 'Nasta' | profilePicture:'jpg' }} → 'assets/img/app/profile/Nasta.jpg'
 *
 * Usage:
 *   import { profilePicture } from '../utils/profilePicture';
 *   <img src={profilePicture('Nasta')} />
 *   <img src={profilePicture('Nasta', 'jpg')} />
 */

var IMAGES_ROOT = 'assets/img/';
export var PROFILE_IMAGES_ROOT = IMAGES_ROOT + 'app/profile/';

export function profilePicture(name, ext) {
  ext = ext || 'png';
  return PROFILE_IMAGES_ROOT + name + '.' + ext;
}
