import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BaConfigService } from './ba-config.service';

@Injectable({ providedIn: 'root' })
export class ThemeLayoutSettingsService {
  readonly mobile: boolean;
  readonly blur: boolean;

  constructor(config: BaConfigService, @Inject(DOCUMENT) document: Document) {
    this.mobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(
      navigator.userAgent.toLowerCase(),
    );
    this.blur = config.theme.blur;
    if (this.mobile) document.body.classList.add('mobile');
    if (this.blur) document.body.classList.add('blur-theme');
  }
}
