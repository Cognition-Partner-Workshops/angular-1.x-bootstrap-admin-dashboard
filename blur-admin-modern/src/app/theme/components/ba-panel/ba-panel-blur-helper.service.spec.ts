import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaPanelBlurHelperService } from './ba-panel-blur-helper.service';

@Injectable()
class TestPanelBlurHelper extends BaPanelBlurHelperService {
  setImageSize(width: number, height: number): void {
    this.image = new Image();
    this.image.width = width;
    this.image.height = height;
  }
}

describe('BaPanelBlurHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TestPanelBlurHelper, { provide: BaPanelBlurHelperService, useExisting: TestPanelBlurHelper }, { provide: DOCUMENT, useValue: document }],
  }));

  it('creates', () => expect(TestBed.inject(TestPanelBlurHelper)).toBeTruthy());

  it('calculates cover image dimensions and offsets', () => {
    const service = TestBed.inject(TestPanelBlurHelper);
    service.setImageSize(2000, 1000);
    const result = service.getBodyBgImageSizes();
    expect(result).toBeTruthy();
    expect(result!.width).toBeGreaterThan(0);
    expect(result!.height / result!.width).toBeCloseTo(0.5);
  });
});
