import * as am5 from '@amcharts/amcharts5';
import { BaConfigService } from '../../../theme';

export class BlurTheme extends am5.Theme {
  private constructor(root: am5.Root, isReal: boolean, private readonly config?: BaConfigService) {
    super(root, isReal);
  }
  static newWithConfig(root: am5.Root, config: BaConfigService): BlurTheme {
    return new BlurTheme(root, true, config);
  }
  protected override setupDefaultRules(): void {
    const root = this._root;
    const colors = this.config?.colors;
    if (!colors) return;
    const palette = [colors.primary, colors.danger, colors.warning, colors.success, colors.info,
      colors.primaryDark, colors.warningLight, colors.successDark, colors.successLight, colors.primaryLight, colors.warningDark]
      .map((value) => am5.color(parseInt(value.slice(1), 16)));
    const colorSet = am5.ColorSet.new(root, { colors: palette });
    this.rule('SerialChart').setAll({ colors: colorSet });
    this.rule('PercentSeries').setAll({ colors: colorSet });
    this.rule('Label').setAll({ fill: am5.color(parseInt(colors.defaultText.slice(1), 16)) });
    this.rule('Grid').setAll({ stroke: am5.color(0xffffff), strokeOpacity: 0.1 });
    this.rule('AxisRenderer').setAll({ stroke: am5.color(0xffffff), strokeOpacity: 0.3 });
    this.rule('Line', ['cursor', 'x']).setAll({ stroke: palette[0], strokeOpacity: 0.5 });
    this.rule('Line', ['cursor', 'y']).setAll({ stroke: palette[0], strokeOpacity: 0.5 });
    this.rule('Scrollbar').setAll({ background: am5.RoundedRectangle.new(root, { fill: am5.color(0xffffff), fillOpacity: 0.12 }) });
    this.rule('Line').setAll({ strokeOpacity: 0.9 });
  }
}
