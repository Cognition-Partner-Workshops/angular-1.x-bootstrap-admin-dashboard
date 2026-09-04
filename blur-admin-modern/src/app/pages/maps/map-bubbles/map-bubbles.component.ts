import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { BaConfigService, BaPanelComponent } from '../../../theme';
import { LATLONG, MAP_DATA } from './map-bubbles.data';
import { createZoomControl } from '../am5-theme';

export function bubbleSize(value: number, min: number, max: number): number {
  const minBulletSize = 3;
  const maxBulletSize = 70;
  const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
  const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;
  let square = ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
  if (square < minSquare) square = minSquare;
  return Math.sqrt(square / (Math.PI * 2));
}

@Component({
  selector: 'app-map-bubbles',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <div class="widgets">
      <div class="row">
        <div class="col-md-12">
          <ba-panel title="Map with Bubbles" baPanelClass="viewport100">
            <div id="map-bubbles" #chart></div>
          </ba-panel>
        </div>
      </div>
    </div>
  `,
})
export class MapBubblesComponent implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly config = inject(BaConfigService);
  private root?: am5.Root;
  polygonSeries?: am5map.MapPolygonSeries;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.createChart());
  }

  private createChart(): void {
    const element = this.element.nativeElement.querySelector('#map-bubbles');
    if (!element) return;
    const root = am5.Root.new(element);
    this.root = root;
    const chart = root.container.children.push(am5map.MapChart.new(root, {
      projection: am5map.geoMercator(),
    }));
    chart.set('zoomControl', createZoomControl(root, this.config.colors));

    const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ['AQ'],
    }));
    this.polygonSeries = polygonSeries;
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x000000),
      fillOpacity: 0.1,
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.5,
      strokeWidth: 0.5,
    });

    const values = MAP_DATA.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.bullets.push((bulletRoot, _series, dataItem) => {
      const item = dataItem.dataContext as { size: number; color: string; title: string; value: number };
      return am5.Bullet.new(bulletRoot, {
        sprite: am5.Circle.new(bulletRoot, {
          radius: item.size / 2,
          fill: am5.color(item.color),
          tooltipText: '[bold]{title}[/]: {value}',
        }),
      });
    });
    pointSeries.data.setAll(MAP_DATA.map((item) => ({
      ...item,
      latitude: LATLONG[item.code].latitude,
      longitude: LATLONG[item.code].longitude,
      size: bubbleSize(item.value, min, max),
      color: this.config.colors[item.color],
      title: item.name,
    })));

    const defaultText = am5.color(this.config.colors.defaultText);
    chart.children.push(am5.Label.new(root, {
      text: 'Population of the World in 2011',
      fontSize: 14,
      fill: defaultText,
      x: am5.p50,
      y: 10,
      centerX: am5.p50,
    }));
    chart.children.push(am5.Label.new(root, {
      text: 'source: Gapminder',
      fontSize: 11,
      fill: defaultText,
      x: am5.p50,
      y: 30,
      centerX: am5.p50,
    }));
    am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
  }

  ngOnDestroy(): void {
    this.root?.dispose();
  }
}
