import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { BaConfigService, BaPanelComponent } from '../../../theme';
import { CITIES, ORIGINS, PLANE_SVG, TARGET_SVG, MapCity } from './map-lines.data';
import { createZoomControl } from '../am5-theme';

@Component({
  selector: 'app-map-lines',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <div class="widgets">
      <div class="row">
        <div class="col-md-12">
          <ba-panel title="Line Map" baPanelClass="viewport100">
            <div id="map-lines" #chart></div>
          </ba-panel>
        </div>
      </div>
    </div>
  `,
})
export class MapLinesComponent implements AfterViewInit, OnDestroy {
  origin: 'london' | 'vilnius' = 'london';
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly config = inject(BaConfigService);
  private root?: am5.Root;
  private chart?: am5map.MapChart;
  polygonSeries?: am5map.MapPolygonSeries;
  private lineSeries?: am5map.MapLineSeries;
  private heading?: am5.Label;
  switchLabel?: am5.Label;
  private readonly originSprites: Partial<Record<'london' | 'vilnius', am5.Graphics>> = {};

  get headingText(): string {
    return this.heading?.get('text') ?? `Flights from ${this.origin[0].toUpperCase()}${this.origin.slice(1)}`;
  }

  get switchText(): string {
    return this.switchLabel?.get('text') ?? `show flights from ${this.origin === 'london' ? 'Vilnius' : 'London'}`;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.createChart());
  }

  private createChart(): void {
    const element = this.element.nativeElement.querySelector('#map-lines');
    if (!element) return;
    const root = am5.Root.new(element);
    this.root = root;
    const chart = root.container.children.push(am5map.MapChart.new(root, {
      projection: am5map.geoMercator(),
      homeGeoPoint: { longitude: -20.1341, latitude: 49.1712 },
      homeZoomLevel: 2.74,
    }));
    this.chart = chart;
    const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow }));
    this.polygonSeries = polygonSeries;
    const colors = this.config.colors;
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(colors.info),
      fillOpacity: 0.4,
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.5,
      strokeWidth: 0.5,
      tooltipText: '{name}',
    });
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(colors.primary),
    });
    polygonSeries.events.once('datavalidated', () => {
      const city = ORIGINS[this.origin];
      chart.zoomToGeoPoint({
        longitude: city.zoomLongitude,
        latitude: city.zoomLatitude,
      }, city.zoomLevel, true);
    });
    chart.set('zoomControl', createZoomControl(root, colors));
    const points = chart.series.push(am5map.MapPointSeries.new(root, {}));
    points.bullets.push((bulletRoot, _series, dataItem) => {
      const city = dataItem.dataContext as MapCity;
      const sprite = am5.Graphics.new(bulletRoot, {
        svgPath: TARGET_SVG,
        scale: city.scale ?? 1,
        fill: am5.color(city.id === this.origin ? colors.warning : colors.warningLight),
        fillOpacity: 0.8,
        interactive: true,
        tooltipText: city.title,
        cursorOverStyle: 'pointer',
      });
      if (city.id) this.originSprites[city.id] = sprite;
      sprite.events.on('click', () => {
        if (city.id) this.selectOrigin(city.id);
      });
      return am5.Bullet.new(bulletRoot, { sprite });
    });
    points.data.setAll(CITIES);

    this.heading = chart.children.push(am5.Label.new(root, {
      text: 'Flights from London',
      fontSize: 20,
      fill: am5.color(this.config.colors.defaultText),
      x: 137,
      y: 45,
      centerY: am5.p50,
      layer: 30,
    }));
    this.switchLabel = chart.children.push(am5.Label.new(root, {
      text: 'show flights from Vilnius',
      fontSize: 11,
      fill: am5.color(this.config.colors.defaultText),
      x: 106,
      y: 70,
      cursorOverStyle: 'pointer',
      interactive: true,
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        fillOpacity: 0,
      }),
      layer: 30,
    }));
    this.switchLabel.events.on('click', () => this.selectOrigin(this.origin === 'london' ? 'vilnius' : 'london'));
    chart.children.push(am5.Graphics.new(root, {
      svgPath: PLANE_SVG,
      fill: am5.color(colors.defaultText),
      x: 100,
      y: 45,
      layer: 30,
    }));
    this.lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
      lineType: 'straight',
    }));
    this.lineSeries.mapLines.template.setAll({
      stroke: am5.color(colors.warningLight),
      strokeOpacity: 0.8,
    });
    this.applyOrigin('london', false);
    am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
  }

  selectOrigin(origin: 'london' | 'vilnius'): void {
    this.applyOrigin(origin, true);
  }

  private applyOrigin(origin: 'london' | 'vilnius', shouldZoom: boolean): void {
    if (!this.lineSeries) return;
    this.origin = origin;
    Object.entries(this.originSprites).forEach(([id, sprite]) => {
      sprite?.set('fill', am5.color(id === origin ? this.config.colors.warning : this.config.colors.warningLight));
    });
    const city = ORIGINS[origin];
    this.lineSeries.data.setAll(city.lines.map((line) => ({
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [line.longitudes[0], line.latitudes[0]],
          [line.longitudes[1], line.latitudes[1]],
        ],
      },
    })));
    this.heading?.set('text', `Flights from ${origin === 'london' ? 'London' : 'Vilnius'}`);
    this.switchLabel?.set('text', `show flights from ${origin === 'london' ? 'Vilnius' : 'London'}`);
    if (shouldZoom) {
      this.chart?.zoomToGeoPoint({
        longitude: city.zoomLongitude,
        latitude: city.zoomLatitude,
      }, city.zoomLevel, true);
    }
  }

  ngOnDestroy(): void {
    this.root?.dispose();
  }
}
