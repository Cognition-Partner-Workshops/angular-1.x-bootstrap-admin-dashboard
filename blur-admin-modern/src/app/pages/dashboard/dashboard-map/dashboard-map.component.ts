import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewEncapsulation, inject, viewChild } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { BaColors, BaConfigService } from '../../../theme';

export interface MapArea {
  title: string;
  id: string;
  color: string;
  customData: string;
  groupId: '1' | '2' | '3' | '4';
}

export interface MapLegendItem {
  title: string;
  color: string;
}

export const buildMapAreas = (layoutColors: BaColors): MapArea[] => [
  { title: 'Austria', id: 'AT', color: layoutColors.primary, customData: '1 244', groupId: '1' },
  { title: 'Ireland', id: 'IE', color: layoutColors.primary, customData: '1 342', groupId: '1' },
  { title: 'Denmark', id: 'DK', color: layoutColors.primary, customData: '1 973', groupId: '1' },
  { title: 'Finland', id: 'FI', color: layoutColors.primary, customData: '1 573', groupId: '1' },
  { title: 'Sweden', id: 'SE', color: layoutColors.primary, customData: '1 084', groupId: '1' },
  { title: 'Great Britain', id: 'GB', color: layoutColors.primary, customData: '1 452', groupId: '1' },
  { title: 'Italy', id: 'IT', color: layoutColors.primary, customData: '1 321', groupId: '1' },
  { title: 'France', id: 'FR', color: layoutColors.primary, customData: '1 112', groupId: '1' },
  { title: 'Spain', id: 'ES', color: layoutColors.primary, customData: '1 865', groupId: '1' },
  { title: 'Greece', id: 'GR', color: layoutColors.primary, customData: '1 453', groupId: '1' },
  { title: 'Germany', id: 'DE', color: layoutColors.primary, customData: '1 957', groupId: '1' },
  { title: 'Belgium', id: 'BE', color: layoutColors.primary, customData: '1 011', groupId: '1' },
  { title: 'Luxembourg', id: 'LU', color: layoutColors.primary, customData: '1 011', groupId: '1' },
  { title: 'Netherlands', id: 'NL', color: layoutColors.primary, customData: '1 213', groupId: '1' },
  { title: 'Portugal', id: 'PT', color: layoutColors.primary, customData: '1 291', groupId: '1' },
  { title: 'Lithuania', id: 'LT', color: layoutColors.successLight, customData: '567', groupId: '2' },
  { title: 'Latvia', id: 'LV', color: layoutColors.successLight, customData: '589', groupId: '2' },
  { title: 'Czech Republic ', id: 'CZ', color: layoutColors.successLight, customData: '785', groupId: '2' },
  { title: 'Slovakia', id: 'SK', color: layoutColors.successLight, customData: '965', groupId: '2' },
  { title: 'Estonia', id: 'EE', color: layoutColors.successLight, customData: '685', groupId: '2' },
  { title: 'Hungary', id: 'HU', color: layoutColors.successLight, customData: '854', groupId: '2' },
  { title: 'Cyprus', id: 'CY', color: layoutColors.successLight, customData: '754', groupId: '2' },
  { title: 'Malta', id: 'MT', color: layoutColors.successLight, customData: '867', groupId: '2' },
  { title: 'Poland', id: 'PL', color: layoutColors.successLight, customData: '759', groupId: '2' },
  { title: 'Romania', id: 'RO', color: layoutColors.success, customData: '302', groupId: '3' },
  { title: 'Bulgaria', id: 'BG', color: layoutColors.success, customData: '102', groupId: '3' },
  { title: 'Slovenia', id: 'SI', color: layoutColors.danger, customData: '23', groupId: '4' },
  { title: 'Croatia', id: 'HR', color: layoutColors.danger, customData: '96', groupId: '4' },
];

export const buildMapLegend = (layoutColors: BaColors): MapLegendItem[] => [
  { title: 'over 1 000 users', color: layoutColors.primary },
  { title: '500 - 1 000 users', color: layoutColors.successLight },
  { title: '100 - 500 users', color: layoutColors.success },
  { title: '0 - 100 users', color: layoutColors.danger },
];

@Component({
  selector: 'dashboard-map',
  standalone: true,
  template: '<div id="amChartMap" #map></div>',
  styleUrl: './dashboard-map.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardMapComponent implements AfterViewInit, OnDestroy {
  private readonly config = inject(BaConfigService);
  private readonly zone = inject(NgZone);
  private readonly mapRef = viewChild.required<ElementRef<HTMLDivElement>>('map');

  readonly areas = buildMapAreas(this.config.colors);
  readonly legendItems = buildMapLegend(this.config.colors);
  root?: am5.Root;
  chart?: am5map.MapChart;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.createMap());
  }

  ngOnDestroy(): void {
    this.root?.dispose();
    this.root = undefined;
    this.chart = undefined;
  }

  private createMap(): void {
    const layoutColors = this.config.colors;
    const root = am5.Root.new(this.mapRef().nativeElement);
    this.root = root;

    const chart = root.container.children.push(am5map.MapChart.new(root, {
      projection: am5map.geoMercator(),
      panX: 'none',
      panY: 'none',
      wheelX: 'none',
      wheelY: 'none',
      pinchZoom: false,
      homeZoomLevel: 3.5,
      homeGeoPoint: { longitude: 10, latitude: 52 },
    }));
    this.chart = chart;

    const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ['AQ'],
    }));
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(layoutColors.defaultText),
      fillOpacity: 0.2,
      stroke: am5.color(layoutColors.border),
      strokeWidth: 0.5,
      interactive: true,
    });
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(layoutColors.primaryDark),
      fillOpacity: 0.8,
      stroke: am5.color(layoutColors.border),
    });
    polygonSeries.mapPolygons.template.adapters.add('tooltipText', (text, target) => {
      const data = target.dataItem?.dataContext as Partial<MapArea> | undefined;
      return data?.customData ? '{name}: {customData} users' : text;
    });
    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const data = target.dataItem?.dataContext as Partial<MapArea> | undefined;
      return data?.color ? am5.color(data.color) : fill;
    });
    polygonSeries.mapPolygons.template.adapters.add('fillOpacity', (opacity, target) => {
      const data = target.dataItem?.dataContext as Partial<MapArea> | undefined;
      return data?.color ? 0.8 : opacity;
    });
    polygonSeries.data.setAll(this.areas.map((a) => ({ id: a.id, customData: a.customData, color: a.color, groupId: a.groupId })));

    const legend = chart.children.push(am5.Legend.new(root, {
      y: am5.percent(100),
      centerY: am5.percent(100),
      x: 27,
      width: am5.percent(100),
      paddingLeft: 27,
      paddingRight: 27,
      layout: root.horizontalLayout,
      background: am5.Rectangle.new(root, {
        fill: am5.color(layoutColors.border),
        fillOpacity: 0.3,
        stroke: am5.color(layoutColors.border),
        strokeOpacity: 1,
      }),
    }));
    legend.labels.template.setAll({ fill: am5.color(layoutColors.defaultText), fontSize: 12 });
    legend.markers.template.setAll({ width: 12, height: 12 });
    legend.data.setAll(this.legendItems.map((item) => ({ name: item.title, fill: am5.color(item.color) })));

    polygonSeries.events.once('datavalidated', () => chart.goHome(0));
    chart.appear(0, 0);
  }
}
