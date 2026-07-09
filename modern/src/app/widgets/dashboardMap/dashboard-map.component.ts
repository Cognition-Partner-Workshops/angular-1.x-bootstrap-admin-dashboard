import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

/**
 * Modern standalone port of the legacy AngularJS `dashboardMap` widget
 * ("Users by Country" world choropleth).
 *
 * The legacy widget used amCharts v3 (`AmCharts.makeChart({ type: 'map',
 * map: 'worldLow' })`). This reimplements it with amCharts 5's map module plus
 * the `worldLow` geodata: a world map zoomed toward Europe, with the listed
 * countries coloured by group and a `"{name}: {value} users"` tooltip on hover.
 */
@Component({
  selector: 'app-dashboard-map',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-map.component.html',
  styleUrl: './dashboard-map.component.scss',
})
export class DashboardMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartDiv', { static: true }) chartDiv!: ElementRef<HTMLDivElement>;

  private root?: am5.Root;

  /** Legacy `baConfig.colors` palette (hardcoded). */
  private readonly colors = {
    primary: '#209e91',
    primaryDark: '#1b867b', // primary darkened ~15%
    successLight: '#b6d24d', // success tinted ~30% lighter
    success: '#90b900',
    danger: '#e85656',
    defaultText: '#666666',
    border: '#dddddd',
  };

  /** Legend entries mirroring the legacy widget. */
  readonly legend = [
    { title: 'over 1 000 users', color: this.colors.primary },
    { title: '500 - 1 000 users', color: this.colors.successLight },
    { title: '100 - 500 users', color: this.colors.success },
    { title: '0 - 100 users', color: this.colors.danger },
  ];

  /**
   * Country data ported verbatim from the legacy `DashboardMapCtrl`
   * (`id`, display `name`, `value` string, group colour).
   */
  private readonly areas: { id: string; name: string; value: string; color: string }[] = [
    // GROUP 1 — primary
    { id: 'AT', name: 'Austria', value: '1 244', color: this.colors.primary },
    { id: 'IE', name: 'Ireland', value: '1 342', color: this.colors.primary },
    { id: 'DK', name: 'Denmark', value: '1 973', color: this.colors.primary },
    { id: 'FI', name: 'Finland', value: '1 573', color: this.colors.primary },
    { id: 'SE', name: 'Sweden', value: '1 084', color: this.colors.primary },
    { id: 'GB', name: 'Great Britain', value: '1 452', color: this.colors.primary },
    { id: 'IT', name: 'Italy', value: '1 321', color: this.colors.primary },
    { id: 'FR', name: 'France', value: '1 112', color: this.colors.primary },
    { id: 'ES', name: 'Spain', value: '1 865', color: this.colors.primary },
    { id: 'GR', name: 'Greece', value: '1 453', color: this.colors.primary },
    { id: 'DE', name: 'Germany', value: '1 957', color: this.colors.primary },
    { id: 'BE', name: 'Belgium', value: '1 011', color: this.colors.primary },
    { id: 'LU', name: 'Luxembourg', value: '1 011', color: this.colors.primary },
    { id: 'NL', name: 'Netherlands', value: '1 213', color: this.colors.primary },
    { id: 'PT', name: 'Portugal', value: '1 291', color: this.colors.primary },
    // GROUP 2 — successLight
    { id: 'LT', name: 'Lithuania', value: '567', color: this.colors.successLight },
    { id: 'LV', name: 'Latvia', value: '589', color: this.colors.successLight },
    { id: 'CZ', name: 'Czech Republic ', value: '785', color: this.colors.successLight },
    { id: 'SK', name: 'Slovakia', value: '965', color: this.colors.successLight },
    { id: 'EE', name: 'Estonia', value: '685', color: this.colors.successLight },
    { id: 'HU', name: 'Hungary', value: '854', color: this.colors.successLight },
    { id: 'CY', name: 'Cyprus', value: '754', color: this.colors.successLight },
    { id: 'MT', name: 'Malta', value: '867', color: this.colors.successLight },
    { id: 'PL', name: 'Poland', value: '759', color: this.colors.successLight },
    // GROUP 3 — success
    { id: 'RO', name: 'Romania', value: '302', color: this.colors.success },
    { id: 'BG', name: 'Bulgaria', value: '102', color: this.colors.success },
    // GROUP 4 — danger
    { id: 'SI', name: 'Slovenia', value: '23', color: this.colors.danger },
    { id: 'HR', name: 'Croatia', value: '96', color: this.colors.danger },
  ];

  ngAfterViewInit(): void {
    const root = am5.Root.new(this.chartDiv.nativeElement);
    this.root = root;
    root._logo?.dispose();

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        homeGeoPoint: { longitude: 10, latitude: 52 },
        homeZoomLevel: 3.5,
      }),
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      }),
    );

    // Default (unlisted) look: faint defaultText fill, no highlight data.
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(this.colors.defaultText),
      fillOpacity: 0.2,
      stroke: am5.color(this.colors.border),
      strokeWidth: 0.5,
      interactive: true,
    });

    // Per-country fill from the ported data.
    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const ctx = target.dataItem?.dataContext as { color?: string } | undefined;
      return ctx?.color ? am5.color(ctx.color) : fill;
    });
    polygonSeries.mapPolygons.template.adapters.add('fillOpacity', (opacity, target) => {
      const ctx = target.dataItem?.dataContext as { color?: string } | undefined;
      return ctx?.color ? 0.8 : opacity;
    });

    // Tooltip only for listed countries: "{name}: {value} users".
    polygonSeries.mapPolygons.template.adapters.add('tooltipText', (text, target) => {
      const ctx = target.dataItem?.dataContext as { value?: string } | undefined;
      return ctx?.value ? '{name}: {value} users' : undefined;
    });

    // Roll-over highlight (legacy rollOverColor = primaryDark).
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(this.colors.primaryDark),
      fillOpacity: 0.8,
      stroke: am5.color(this.colors.border),
    });

    polygonSeries.data.setAll(
      this.areas.map((a) => ({ id: a.id, name: a.name, value: a.value, color: a.color })),
    );

    // Zoom toward Europe once the geometry is ready.
    polygonSeries.events.once('datavalidated', () => {
      chart.goHome(0);
    });
  }

  ngOnDestroy(): void {
    this.root?.dispose();
  }
}
