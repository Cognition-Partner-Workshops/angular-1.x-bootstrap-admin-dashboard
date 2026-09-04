import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenWeatherForecast, WEATHER_API_URL, WEATHER_ICONS, WeatherComponent } from './weather.component';

const forecast = (): OpenWeatherForecast => {
  const list: OpenWeatherForecast['list'] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let day = 0; day < 7; day++) {
    for (const hour of [3, 9, 15, 21]) {
      const d = new Date(base);
      d.setDate(base.getDate() + day);
      d.setHours(hour);
      const pad = (n: number) => String(n).padStart(2, '0');
      list.push({
        dt_txt: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(hour)}:00:00`,
        main: { temp: 10 + day + hour / 10 },
        weather: [{ main: hour === 15 ? 'Clear' : 'Clouds', description: hour === 15 ? 'clear sky' : 'few clouds', icon: hour === 15 ? '01d' : '02d' }],
      });
    }
  }
  return { list };
};

describe('WeatherComponent', () => {
  let fixture: ComponentFixture<WeatherComponent>;
  let component: WeatherComponent;
  let http: HttpTestingController;

  beforeEach(async () => {
    spyOn(navigator.geolocation, 'getCurrentPosition');
    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    fixture.destroy();
  });

  it('creates and requests the browser location', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.weather-wrapper')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#tempChart')).toBeTruthy();
  });

  it('exposes the legacy icon map and metric units by default', () => {
    expect(component.weatherIcons).toBe(WEATHER_ICONS);
    expect(WEATHER_ICONS['01d']).toBe('ion-ios-sunny-outline');
    expect(WEATHER_ICONS['13n']).toBe('ion-ios-snowy');
    expect(component.units()).toBe('metric');
  });

  it('does not call the weather API without an API key', () => {
    fixture.detectChanges();
    component.setGeoData({ geoplugin_city: 'Minsk', geoplugin_countryName: 'Belarus', geoplugin_latitude: 53.9, geoplugin_longitude: 27.56 });
    http.expectNone(() => true);
  });

  it('fetches the forecast over https and groups it into days once geo data and key are present', () => {
    fixture.componentRef.setInput('apiKey', 'test-key');
    fixture.componentRef.setInput('forecast', '5');
    fixture.detectChanges();
    component.setGeoData({ geoplugin_city: 'Minsk', geoplugin_countryName: 'Belarus', geoplugin_latitude: 53.9, geoplugin_longitude: 27.56 });

    const req = http.expectOne((r) => r.url === WEATHER_API_URL);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('appid')).toBe('test-key');
    expect(req.request.params.get('lat')).toBe('53.9');
    expect(req.request.params.get('lon')).toBe('27.56');
    expect(req.request.params.get('units')).toBe('metric');
    req.flush(forecast());
    fixture.detectChanges();

    const weather = component.weather()!;
    expect(weather.days.length).toBe(5);
    expect(weather.current).toBe(0);
    expect(weather.days[1].timeTemp.length).toBe(4);
    expect(weather.days[1].main).toBe('Clear');
    expect(weather.days[1].icon).toBe('01d');
    expect(weather.days[1].date.getHours()).toBe(15);

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Minsk - BELARUS');
    expect(el.querySelectorAll('.select-day .day').length).toBe(5);
    expect(el.querySelector('.weather-temp')?.textContent).toContain('°C');
  });

  it('switches units and re-requests, and switches the selected day', () => {
    fixture.componentRef.setInput('apiKey', 'test-key');
    fixture.detectChanges();
    component.setGeoData({ geoplugin_city: 'Minsk', geoplugin_countryName: 'Belarus', geoplugin_latitude: 53.9, geoplugin_longitude: 27.56 });
    http.expectOne((r) => r.url === WEATHER_API_URL).flush(forecast());
    fixture.detectChanges();

    component.switchUnits('imperial');
    const req = http.expectOne((r) => r.url === WEATHER_API_URL);
    expect(req.request.params.get('units')).toBe('imperial');
    req.flush(forecast());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.weather-temp')?.textContent).toContain('°F');

    component.switchDay(2);
    fixture.detectChanges();
    expect(component.weather()?.current).toBe(2);
    expect(component.currentDay()).toBe(component.weather()!.days[2]);
  });
});
