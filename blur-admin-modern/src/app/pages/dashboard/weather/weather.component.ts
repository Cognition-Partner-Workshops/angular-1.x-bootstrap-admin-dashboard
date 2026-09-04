import { DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewEncapsulation, inject, input, signal, viewChild } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

export type WeatherUnits = 'metric' | 'imperial';

export interface WeatherGeoData {
  geoplugin_city: string;
  geoplugin_countryName: string;
  geoplugin_latitude: number;
  geoplugin_longitude: number;
}

export interface WeatherTimeTemp {
  time: number;
  temp: number;
}

export interface WeatherDay {
  date: Date;
  timeTemp: WeatherTimeTemp[];
  main?: string;
  description?: string;
  icon?: string;
  temp?: number;
}

export interface WeatherData {
  days: WeatherDay[];
  current: number;
}

export interface OpenWeatherForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { main: string; description: string; icon: string }[];
}

export interface OpenWeatherForecast {
  list: OpenWeatherForecastItem[];
}

export const WEATHER_ICONS: Record<string, string> = {
  '01d': 'ion-ios-sunny-outline',
  '02d': 'ion-ios-partlysunny-outline',
  '03d': 'ion-ios-cloud-outline',
  '04d': 'ion-ios-cloud',
  '09d': 'ion-ios-rainy',
  '10d': 'ion-ios-rainy-outline',
  '11d': 'ion-ios-thunderstorm-outline',
  '13d': 'ion-ios-snowy',
  '50d': 'ion-ios-cloudy-outline',
  '01n': 'ion-ios-cloudy-night-outline',
  '02n': 'ion-ios-cloudy-night',
  '03n': 'ion-ios-cloud-outline',
  '04n': 'ion-ios-cloud',
  '09n': 'ion-ios-rainy',
  '10n': 'ion-ios-rainy-outline',
  '11n': 'ion-ios-thunderstorm',
  '13n': 'ion-ios-snowy',
  '50n': 'ion-ios-cloudy-outline',
};

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const MIDDLE_OF_THE_DAY = 15;

/**
 * Port of the legacy `weather` directive. The OpenWeatherMap key is supplied via the `apiKey` input
 * (never hard-coded), the geo lookup uses the browser Geolocation API instead of the geoplugin JSONP call,
 * and the temperature chart is drawn with amCharts 5.
 */
@Component({
  selector: 'weather, [weather]',
  standalone: true,
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly zone = inject(NgZone);
  private readonly chartRef = viewChild.required<ElementRef<HTMLDivElement>>('tempChart');

  readonly forecast = input(5, { transform: (v: string | number) => Number(v) || 5 });
  readonly apiKey = input('');

  readonly weatherIcons = WEATHER_ICONS;
  readonly units = signal<WeatherUnits>('metric');
  readonly geoData = signal<WeatherGeoData | undefined>(undefined);
  readonly weather = signal<WeatherData | undefined>(undefined);

  private root?: am5.Root;

  ngOnInit(): void {
    this.updateGeoData();
  }

  ngOnDestroy(): void {
    this.root?.dispose();
    this.root = undefined;
  }

  currentDay(): WeatherDay | undefined {
    const weather = this.weather();
    return weather?.days[weather.current];
  }

  switchUnits(name: WeatherUnits): void {
    this.units.set(name);
    this.updateWeather();
  }

  switchDay(day: number): void {
    const weather = this.weather();
    if (!weather) return;
    this.weather.set({ ...weather, current: day });
    this.makeChart(weather.days[day].timeTemp);
  }

  updateWeather(): void {
    const geoData = this.geoData();
    if (!geoData || !this.apiKey()) return;
    this.http.get<OpenWeatherForecast>(WEATHER_API_URL, {
      params: {
        appid: this.apiKey(),
        lat: geoData.geoplugin_latitude,
        lon: geoData.geoplugin_longitude,
        units: this.units(),
      },
    }).subscribe({
      next: (data) => {
        const weather = this.saveWeatherData(data);
        this.makeChart(weather.days[weather.current].timeTemp);
      },
      error: () => console.log('WEATHER FAILED'),
    });
  }

  setGeoData(geoData: WeatherGeoData): void {
    this.geoData.set(geoData);
    this.updateWeather();
  }

  saveWeatherData(data: OpenWeatherForecast): WeatherData {
    const firstItem = data.list[0];
    const weather: WeatherData = {
      days: [{
        date: new Date(),
        timeTemp: [],
        main: firstItem.weather[0].main,
        description: firstItem.weather[0].description,
        icon: firstItem.weather[0].icon,
        temp: firstItem.main.temp,
      }],
      current: 0,
    };
    data.list.forEach((item, i) => {
      const itemDate = new Date(item.dt_txt);
      if (itemDate.getDate() !== weather.days[weather.days.length - 1].date.getDate()) {
        weather.days.push({ date: itemDate, timeTemp: [] });
      }
      const lastItem = weather.days[weather.days.length - 1];
      lastItem.timeTemp.push({ time: itemDate.getHours(), temp: item.main.temp });
      if ((weather.days.length > 1 && itemDate.getHours() === MIDDLE_OF_THE_DAY) || i === data.list.length - 1) {
        lastItem.main = item.weather[0].main;
        lastItem.description = item.weather[0].description;
        lastItem.icon = item.weather[0].icon;
        lastItem.temp = item.main.temp;
        lastItem.date.setHours(i === data.list.length - 1 ? 0 : MIDDLE_OF_THE_DAY);
        lastItem.date.setMinutes(0);
      }
    });
    weather.days = weather.days.slice(0, this.forecast());
    this.weather.set(weather);
    return weather;
  }

  private updateGeoData(): void {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => this.zone.run(() => this.setGeoData({
        geoplugin_city: '',
        geoplugin_countryName: '',
        geoplugin_latitude: position.coords.latitude,
        geoplugin_longitude: position.coords.longitude,
      })),
      () => console.log('GEO FAILED'),
    );
  }

  private makeChart(data: WeatherTimeTemp[]): void {
    const element = this.chartRef().nativeElement;
    this.zone.runOutsideAngular(() => {
      this.root?.dispose();
      const root = am5.Root.new(element);
      this.root = root;
      const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
      const xRenderer = am5xy.AxisRendererX.new(root, {});
      xRenderer.grid.template.setAll({ strokeOpacity: 0 });
      xRenderer.setAll({ strokeOpacity: 0.3 });
      const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, { categoryField: 'time', renderer: xRenderer }));
      const yRenderer = am5xy.AxisRendererY.new(root, {});
      yRenderer.grid.template.setAll({ strokeOpacity: 0 });
      yRenderer.setAll({ strokeOpacity: 0.3 });
      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));
      const series = chart.series.push(am5xy.LineSeries.new(root, {
        name: 'Temp',
        xAxis,
        yAxis,
        valueYField: 'temp',
        categoryXField: 'time',
      }));
      series.fills.template.setAll({ fillOpacity: 0.3, visible: true });
      series.bullets.push(() => am5.Bullet.new(root, {
        sprite: am5.Rectangle.new(root, { width: 8, height: 8, centerX: am5.p50, centerY: am5.p50, fill: series.get('fill') }),
      }));
      const categories = data.map((d) => ({ time: String(d.time), temp: d.temp }));
      xAxis.data.setAll(categories);
      series.data.setAll(categories);
    });
  }
}
