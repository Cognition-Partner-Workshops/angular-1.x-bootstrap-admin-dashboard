import { TestBed } from '@angular/core/testing';
import * as am5 from '@amcharts/amcharts5';
import { BaConfigService } from '../../../theme';
import { MapLinesComponent } from './map-lines.component';

describe('MapLinesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MapLinesComponent], providers: [BaConfigService] }).compileComponents();
  });

  it('renders the line map and switches origins', () => {
    const fixture = TestBed.createComponent(MapLinesComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.widgets .row .col-md-12 ba-panel')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#map-lines svg')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Line Map');
    expect(fixture.componentInstance.switchLabel?.get('interactive')).toBeTrue();
    const colors = TestBed.inject(BaConfigService).colors;
    expect(fixture.componentInstance.polygonSeries?.mapPolygons.template.get('fill')?.toCSSHex())
      .toBe(am5.color(colors.info).toCSSHex());
    expect(fixture.componentInstance.origin).toBe('london');
    fixture.componentInstance.selectOrigin('vilnius');
    expect(fixture.componentInstance.origin).toBe('vilnius');
    expect(fixture.componentInstance.headingText).toBe('Flights from Vilnius');
    expect(fixture.componentInstance.switchText).toBe('show flights from London');
  });
});
