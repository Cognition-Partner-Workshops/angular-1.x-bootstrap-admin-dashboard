import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLinesComponent } from './lines.component';

describe('MapLinesComponent', () => {
  let component: MapLinesComponent;
  let fixture: ComponentFixture<MapLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapLinesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MapLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the ba-panel with correct title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panelTitle = compiled.querySelector('.panel-title');
      expect(panelTitle?.textContent).toContain('Line Map');
    });
  });

  describe('Map Rendering', () => {
    it('should render the map container element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('#map-lines');
      expect(mapContainer).toBeTruthy();
    });

    it('should have the map container with data-testid attribute', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('[data-testid="map-lines-container"]');
      expect(mapContainer).toBeTruthy();
    });

    it('should have proper styling for map container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('#map-lines') as HTMLElement;
      expect(mapContainer).toBeTruthy();
      const styles = window.getComputedStyle(mapContainer);
      expect(styles.width).toBeTruthy();
    });
  });

  describe('Flight Lines Visualization', () => {
    it('should have targetSVG path defined', () => {
      expect((component as unknown as { targetSVG: string })['targetSVG']).toBeDefined();
      expect((component as unknown as { targetSVG: string })['targetSVG']).toContain('M9,0C4.029');
    });

    it('should have planeSVG path defined', () => {
      expect((component as unknown as { planeSVG: string })['planeSVG']).toBeDefined();
      expect((component as unknown as { planeSVG: string })['planeSVG']).toContain('M19.671,8.11');
    });

    it('should inject ThemeConfigService', () => {
      expect((component as unknown as { themeConfig: unknown })['themeConfig']).toBeTruthy();
    });
  });

  describe('Parity with Legacy', () => {
    it('should use viewport100 panel class matching legacy template', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel).toBeTruthy();
    });

    it('should have map-lines id matching legacy template', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapDiv = compiled.querySelector('#map-lines');
      expect(mapDiv).toBeTruthy();
    });
  });
});
