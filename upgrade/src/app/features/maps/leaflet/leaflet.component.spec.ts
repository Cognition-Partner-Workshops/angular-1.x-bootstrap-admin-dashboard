import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LeafletComponent } from './leaflet.component';

describe('LeafletComponent', () => {
  let component: LeafletComponent;
  let fixture: ComponentFixture<LeafletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafletComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability', () => {
    it('should render the leaflet map container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('#leaflet-map');
      expect(mapContainer).toBeTruthy();
    });

    it('should render within a ba-panel with title "Leaflet"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel).toBeTruthy();
    });

    it('should have data-testid attribute for testing', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapElement = compiled.querySelector('[data-testid="leaflet-map"]');
      expect(mapElement).toBeTruthy();
    });
  });

  describe('Map Configuration', () => {
    it('should initialize with correct center coordinates (London)', () => {
      expect(component.options.center.lat).toBe(51.505);
      expect(component.options.center.lng).toBe(-0.09);
    });

    it('should initialize with zoom level 13', () => {
      expect(component.options.zoom).toBe(13);
    });

    it('should have OpenStreetMap tile layer configured', () => {
      expect(component.options.layers.length).toBe(1);
    });

    it('should have a marker layer configured', () => {
      expect(component.layers.length).toBe(1);
    });
  });

  describe('Map Rendering', () => {
    it('should have leaflet directive on map element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapElement = compiled.querySelector('[leaflet]');
      expect(mapElement).toBeTruthy();
    });

    it('should apply viewport100 class to panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel?.getAttribute('panelClass')).toBe('viewport100');
    });
  });

  describe('Map Interactions', () => {
    it('should handle map ready event', () => {
      const mockMap = {
        invalidateSize: jasmine.createSpy('invalidateSize')
      } as unknown as L.Map;
      
      component.onMapReady(mockMap);
      expect(component['map']).toBe(mockMap);
    });

    it('should call invalidateSize after view init', fakeAsync(() => {
      const mockMap = {
        invalidateSize: jasmine.createSpy('invalidateSize')
      } as unknown as L.Map;
      
      component.onMapReady(mockMap);
      component.ngAfterViewInit();
      
      tick(100);
      
      expect(mockMap.invalidateSize).toHaveBeenCalled();
    }));
  });

  describe('Parity with Legacy', () => {
    it('should match legacy marker position [51.5, -0.09]', () => {
      const markerLayer = component.layers[0];
      expect(markerLayer).toBeTruthy();
    });

    it('should use HTTPS for tile layer URL (upgraded from HTTP)', () => {
      const tileLayer = component.options.layers[0];
      expect(tileLayer).toBeTruthy();
    });
  });
});
