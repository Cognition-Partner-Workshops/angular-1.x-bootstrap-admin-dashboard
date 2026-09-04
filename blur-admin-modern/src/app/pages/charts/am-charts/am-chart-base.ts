import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { BaConfigService } from '../../../theme';
import { BlurTheme } from './blur.theme';

@Directive()
export abstract class AmChartBase implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  root?: am5.Root;
  protected readonly useBlurTheme: boolean = true;
  protected constructor(protected readonly config: BaConfigService, private readonly zone: NgZone) {}
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const root = am5.Root.new(this.host.nativeElement);
      this.root = root;
      const themes: am5.Theme[] = [am5themes_Animated.default.new(root)];
      if (this.useBlurTheme) {
        themes.push(BlurTheme.newWithConfig(root, this.config));
      }
      root.setThemes(themes);
      this.createChart(root);
      am5plugins_exporting.Exporting.new(root, { menu: am5plugins_exporting.ExportingMenu.new(root, {}) });
    });
  }
  protected abstract createChart(root: am5.Root): void;
  ngOnDestroy(): void { this.root?.dispose(); }
}
