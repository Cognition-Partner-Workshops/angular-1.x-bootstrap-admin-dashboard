import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaPanelBlurHelperService {
  protected image: HTMLImageElement;
  private readonly loaded: Promise<void>;

  constructor(@Inject(DOCUMENT) document: Document) {
    const computedStyle = getComputedStyle(document.body, ':before');
    this.image = new Image();
    this.image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    this.loaded = new Promise((resolve, reject) => {
      this.image.onerror = () => reject();
      this.image.onload = () => resolve();
    });
  }

  bodyBgLoad(): Promise<void> {
    return this.loaded;
  }

  getBodyBgImageSizes(): { width: number; height: number; positionX: number; positionY: number } | undefined {
    const elemW = document.documentElement.clientWidth;
    const elemH = document.documentElement.clientHeight;
    if (elemW <= 640) return undefined;
    const imgRatio = this.image.height / this.image.width;
    const containerRatio = elemH / elemW;
    let finalHeight: number;
    let finalWidth: number;
    if (containerRatio > imgRatio) {
      finalHeight = elemH;
      finalWidth = elemH / imgRatio;
    } else {
      finalWidth = elemW;
      finalHeight = elemW * imgRatio;
    }
    return {
      width: finalWidth,
      height: finalHeight,
      positionX: (elemW - finalWidth) / 2,
      positionY: (elemH - finalHeight) / 2,
    };
  }
}
