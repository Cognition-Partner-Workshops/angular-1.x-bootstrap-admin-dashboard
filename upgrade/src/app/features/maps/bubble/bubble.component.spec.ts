import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleComponent } from './bubble.component';
import { provideRouter } from '@angular/router';

describe('BubbleComponent', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route Reachability', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const componentDef = (BubbleComponent as unknown as { ɵcmp: { standalone: boolean } }).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Map Rendering', () => {
    it('should render the ba-panel component with correct title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel).toBeTruthy();
    });

    it('should render the map container element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('#map-bubbles');
      expect(mapContainer).toBeTruthy();
    });

    it('should have data-testid attribute for testing', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('[data-testid="map-bubbles-container"]');
      expect(mapContainer).toBeTruthy();
    });
  });

  describe('Bubble Visualization Data', () => {
    it('should have access to theme colors through ThemeConfigService', () => {
      const colors = (component as unknown as { themeConfig: { colors: unknown } }).themeConfig.colors;
      expect(colors).toBeTruthy();
    });

    it('should have primary color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { primary: string } } }).themeConfig.colors;
      expect(colors.primary).toBe('#209e91');
    });

    it('should have danger color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { danger: string } } }).themeConfig.colors;
      expect(colors.danger).toBe('#e85656');
    });

    it('should have warning color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { warning: string } } }).themeConfig.colors;
      expect(colors.warning).toBe('#dfb81c');
    });

    it('should have success color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { success: string } } }).themeConfig.colors;
      expect(colors.success).toBe('#90b900');
    });

    it('should have primaryDark color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { primaryDark: string } } }).themeConfig.colors;
      expect(colors.primaryDark).toBeTruthy();
    });

    it('should have warningDark color defined', () => {
      const colors = (component as unknown as { themeConfig: { colors: { warningDark: string } } }).themeConfig.colors;
      expect(colors.warningDark).toBeTruthy();
    });

    it('should have layout paths for amMap images', () => {
      const layoutPaths = (component as unknown as { themeConfig: { layoutPaths: { images: { amMap: string } } } }).themeConfig.layoutPaths;
      expect(layoutPaths.images.amMap).toContain('ammap');
    });
  });

  describe('Parity with Legacy', () => {
    it('should use viewport100 panel class matching legacy template', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel?.getAttribute('panelClass') || panel?.className).toContain('viewport100');
    });

    it('should have panel title "Map with Bubbles" matching legacy', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('app-ba-panel');
      expect(panel?.getAttribute('panelTitle')).toBe('Map with Bubbles');
    });

    it('should use map-bubbles as container id matching legacy', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mapContainer = compiled.querySelector('#map-bubbles');
      expect(mapContainer).toBeTruthy();
    });
  });
});
