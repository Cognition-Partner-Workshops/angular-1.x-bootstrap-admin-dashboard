import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { BaColors } from '../../theme';

export function createZoomControl(
  root: am5.Root,
  colors: Pick<BaColors, 'primaryDark' | 'defaultText'>,
): am5map.ZoomControl {
  const zoomControl = am5map.ZoomControl.new(root, {});
  const styleButton = (button: am5.Button): void => {
    button.setAll({
      width: 20,
      height: 20,
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(colors.primaryDark),
        fillOpacity: 0.8,
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
        cornerRadiusBR: 0,
        cornerRadiusBL: 0,
      }),
    });
    button.get('icon')?.setAll({
      stroke: am5.color(colors.defaultText),
      fill: am5.color(colors.defaultText),
    });
  };

  styleButton(zoomControl.plusButton);
  styleButton(zoomControl.minusButton);
  zoomControl.homeButton.set('visible', true);
  styleButton(zoomControl.homeButton);
  return zoomControl;
}
