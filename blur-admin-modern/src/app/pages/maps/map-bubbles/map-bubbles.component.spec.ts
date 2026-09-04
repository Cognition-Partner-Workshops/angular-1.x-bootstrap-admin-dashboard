import { TestBed } from '@angular/core/testing';
import { BaConfigService } from '../../../theme';
import { LATLONG, MAP_DATA } from './map-bubbles.data';
import { MapBubblesComponent, bubbleSize } from './map-bubbles.component';

describe('MapBubblesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MapBubblesComponent], providers: [BaConfigService] }).compileComponents();
  });

  it('renders the map and title', () => {
    const fixture = TestBed.createComponent(MapBubblesComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.widgets .row .col-md-12 ba-panel')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#map-bubbles svg')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Map with Bubbles');
    expect(fixture.componentInstance.polygonSeries?.get('exclude')).toEqual(['AQ']);
  });

  it('preserves the legacy data and size formula', () => {
    expect(Object.keys(LATLONG).length).toBe(240);
    expect(MAP_DATA.length).toBe(169);
    expect(MAP_DATA.every((item) => LATLONG[item.code])).toBeTrue();
    expect(bubbleSize(32358260, 324366, 1347565324)).toBeCloseTo(
      Math.sqrt((((32358260 - 324366) / (1347565324 - 324366)) *
        (70 * 70 * 2 * Math.PI - 3 * 3 * 2 * Math.PI) + 3 * 3 * 2 * Math.PI) / (Math.PI * 2)),
    );
    expect(bubbleSize(1347565324, 324366, 1347565324)).toBeCloseTo(70);
  });
});
