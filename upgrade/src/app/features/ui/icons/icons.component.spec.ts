import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Icon Data Parity', () => {
    it('should have exactly 30 kameleon icons matching legacy', () => {
      expect(component.kameleonIcons.length).toBe(30);
      expect(component.kameleonIcons[0]).toEqual({ name: 'Beach', img: 'Beach' });
      expect(component.kameleonIcons[29]).toEqual({ name: 'Santa', img: 'Santa' });
    });

    it('should have exactly 15 kameleon rounded icons matching legacy', () => {
      expect(component.kameleonRoundedIcons.length).toBe(15);
      expect(component.kameleonRoundedIcons[0]).toEqual({ color: 'success', img: 'Apartment', name: 'Apartment' });
      expect(component.kameleonRoundedIcons[14]).toEqual({ color: 'info', img: 'Boss-3', name: 'Boss' });
    });

    it('should have exactly 70 ionicons matching legacy', () => {
      expect(component.ionicons.length).toBe(70);
      expect(component.ionicons[0]).toBe('ion-ionic');
      expect(component.ionicons[69]).toBe('ion-forward');
    });

    it('should have exactly 35 font awesome icons matching legacy', () => {
      expect(component.fontAwesomeIcons.length).toBe(35);
      expect(component.fontAwesomeIcons[0]).toBe('fa fa-adjust');
      expect(component.fontAwesomeIcons[34]).toBe('fa fa-bullhorn');
    });

    it('should have exactly 82 socicons matching legacy', () => {
      expect(component.socicons.length).toBe(82);
      expect(component.socicons[0]).toBe('a');
      expect(component.socicons[81]).toBe('{');
    });
  });

  describe('Kameleon Image Path Generation', () => {
    it('should generate correct kameleon image path', () => {
      const path = component.getKameleonImgPath('Beach');
      expect(path).toBe('assets/img/theme/icon/kameleon/Beach.svg');
    });

    it('should handle hyphenated image names', () => {
      const path = component.getKameleonImgPath('Phone-Booth');
      expect(path).toBe('assets/img/theme/icon/kameleon/Phone-Booth.svg');
    });
  });

  describe('Route Reachability - DOM Rendering', () => {
    it('should render icons screen container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="icons-screen"]')).toBeTruthy();
    });

    it('should render all five icon panels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="kameleon-panel"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="socicon-panel"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="kameleon-rounded-panel"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="ionicons-panel"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="fontawesome-panel"]')).toBeTruthy();
    });
  });

  describe('Icon Display Verification', () => {
    it('should render all kameleon icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const kameleonIcons = compiled.querySelectorAll('[data-testid="kameleon-icon"]');
      expect(kameleonIcons.length).toBe(30);
    });

    it('should render all kameleon rounded icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const roundedIcons = compiled.querySelectorAll('[data-testid="kameleon-rounded-icon"]');
      expect(roundedIcons.length).toBe(15);
    });

    it('should render all ionicons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const ionicons = compiled.querySelectorAll('[data-testid="ionicon-icon"]');
      expect(ionicons.length).toBe(70);
    });

    it('should render all font awesome icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const faIcons = compiled.querySelectorAll('[data-testid="fontawesome-icon"]');
      expect(faIcons.length).toBe(35);
    });

    it('should render all socicons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const socicons = compiled.querySelectorAll('[data-testid="socicon-icon"]');
      expect(socicons.length).toBe(82);
    });
  });

  describe('External Links Parity', () => {
    it('should have correct external links for icon sources', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('a.see-all-icons');
      expect(links.length).toBe(5);

      const hrefs = Array.from(links).map(link => link.getAttribute('href'));
      expect(hrefs).toContain('http://www.kameleon.pics/');
      expect(hrefs).toContain('http://ionicons.com/');
      expect(hrefs).toContain('http://fortawesome.github.io/Font-Awesome/icons/');
      expect(hrefs).toContain('http://www.socicon.com/chart.php');
    });

    it('should open external links in new tab', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('a.see-all-icons');
      links.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });
  });
});
