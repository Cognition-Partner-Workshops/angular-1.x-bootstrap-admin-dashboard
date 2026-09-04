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
    const root = (this as unknown as { _root: am5.Root })._root;
    const colors = this.config?.colors;
    if (!colors) return;
    const palette = [colors.primary, colors.danger, colors.warning, colors.success, colors.info,
      colors.primaryDark, colors.warningLight, colors.successDark, colors.successLight, colors.primaryLight, colors.warningDark]
      .map((value) => am5.color(parseInt(value.slice(1), 16)));
    const rules = this as unknown as { rule(name: string): { setAll(value: Record<string, unknown>): void } };
    const colorSet = (am5.ColorSet as any).new(root, { colors: palette }) as am5.ColorSet;
    (this.rule('Chart') as unknown as { setAll(value: Record<string, unknown>): void }).setAll({ colors: colorSet });
    rules.rule('Label').setAll({ fill: am5.color(parseInt(colors.defaultText.slice(1), 16)) });
    rules.rule('Grid').setAll({ stroke: am5.color(0xffffff), strokeOpacity: 0.1 });
    rules.rule('AxisRenderer').setAll({ stroke: am5.color(0xffffff), strokeOpacity: 0.3 });
    rules.rule('XYCursor').setAll({ lineX: { stroke: palette[0], strokeOpacity: 0.5 }, lineY: { stroke: palette[0], strokeOpacity: 0.5 } });
    rules.rule('Scrollbar').setAll({ background: am5.RoundedRectangle.new(root, { fill: am5.color(0xffffff), fillOpacity: 0.12 }) });
    rules.rule('Legend').setAll({ labelText: '{category}' });
    rules.rule('LineSeries').setAll({ strokeOpacity: 0.9 });
  }
}
