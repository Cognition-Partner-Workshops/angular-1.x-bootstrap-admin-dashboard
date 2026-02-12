import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';
import { provideRouter } from '@angular/router';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability', () => {
    it('should render the buttons page', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const page = compiled.querySelector('[data-testid="buttons-page"]');
      expect(page).toBeTruthy();
    });

    it('should render flat buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="flat-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render raised buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="raised-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render sizes buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="sizes-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render disabled buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="disabled-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render icon buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="icon-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render large buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="large-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render dropdown buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="dropdown-buttons-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render button groups panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="button-groups-panel"]');
      expect(panel).toBeTruthy();
    });

    it('should render progress buttons panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="progress-buttons-panel"]');
      expect(panel).toBeTruthy();
    });
  });

  describe('Button Click Interactions', () => {
    it('should render all flat button variants', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-flat-default"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-flat-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-flat-success"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-flat-info"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-flat-warning"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-flat-danger"]')).toBeTruthy();
    });

    it('should render all raised button variants', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-raised-default"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-raised-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-raised-success"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-raised-info"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-raised-warning"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-raised-danger"]')).toBeTruthy();
    });

    it('should render all size button variants', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-size-xs"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-size-sm"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-size-mm"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-size-md"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-size-xm"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-size-lg"]')).toBeTruthy();
    });

    it('should render all disabled button variants', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const disabledDefault = compiled.querySelector('[data-testid="btn-disabled-default"]') as HTMLButtonElement;
      const disabledPrimary = compiled.querySelector('[data-testid="btn-disabled-primary"]') as HTMLButtonElement;
      expect(disabledDefault).toBeTruthy();
      expect(disabledDefault.disabled).toBeTrue();
      expect(disabledPrimary).toBeTruthy();
      expect(disabledPrimary.disabled).toBeTrue();
    });

    it('should render icon buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-icon-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-icon-default"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-icon-success"]')).toBeTruthy();
    });

    it('should render buttons with icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-with-icon-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-with-icon-default"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-with-icon-success"]')).toBeTruthy();
    });

    it('should render large buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-large-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-large-success"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-large-info"]')).toBeTruthy();
    });

    it('should render button groups', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-group-left"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-group-middle"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-group-right"]')).toBeTruthy();
    });

    it('should render button toolbar', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-toolbar-1"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-toolbar-8"]')).toBeTruthy();
    });
  });

  describe('Dropdown Interactions', () => {
    it('should have 6 dropdown buttons', () => {
      expect(component.dropdownButtons.length).toBe(6);
    });

    it('should have 6 split dropdown buttons', () => {
      expect(component.splitDropdownButtons.length).toBe(6);
    });

    it('should toggle dropdown on click', () => {
      const dropdown = component.dropdownButtons[0];
      expect(dropdown.isOpen).toBeFalse();

      const event = new Event('click');
      component.toggleDropdown(dropdown, event);

      expect(dropdown.isOpen).toBeTrue();
    });

    it('should close all dropdowns when closeAllDropdowns is called', () => {
      component.dropdownButtons[0].isOpen = true;
      component.dropdownButtons[1].isOpen = true;

      component.closeAllDropdowns();

      expect(component.dropdownButtons[0].isOpen).toBeFalse();
      expect(component.dropdownButtons[1].isOpen).toBeFalse();
    });

    it('should render dropdown buttons in DOM', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-dropdown-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-dropdown-success"]')).toBeTruthy();
    });

    it('should render split dropdown buttons in DOM', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="btn-split-primary"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="btn-split-toggle-primary"]')).toBeTruthy();
    });
  });

  describe('Progress Button Configuration', () => {
    it('should have progress button styles configured', () => {
      expect(component.progressButtonStyles.length).toBe(4);
    });

    it('should have perspective button styles configured', () => {
      expect(component.progressButtonPerspective1.length).toBe(4);
      expect(component.progressButtonPerspective2.length).toBe(4);
      expect(component.progressButtonPerspective3.length).toBe(4);
    });

    it('should have line button styles configured', () => {
      expect(component.progressButtonLines.length).toBe(2);
    });

    it('should render progress buttons in DOM', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid="progress-btn-fill-horizontal"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="progress-btn-fill-vertical"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="progress-btn-shrink-horizontal"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="progress-btn-shrink-vertical"]')).toBeTruthy();
    });
  });
});
