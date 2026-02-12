import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelsComponent } from './panels.component';
import { provideRouter } from '@angular/router';

describe('PanelsComponent', () => {
  let component: PanelsComponent;
  let fixture: ComponentFixture<PanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default panels section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h2');
    expect(headings[0].textContent).toContain('Default panels');
  });

  it('should render bootstrap panels section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h2');
    expect(headings[1].textContent).toContain('Bootstrap panels');
  });

  it('should render contextual panels section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h2');
    expect(headings[2].textContent).toContain('Panels with Contextual Classes');
  });

  it('should render panel group section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h2');
    expect(headings[3].textContent).toContain('Panel Group');
  });

  it('should render three default panels using ba-panel component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const baPanels = compiled.querySelectorAll('app-ba-panel');
    expect(baPanels.length).toBe(3);
  });

  it('should render panel with title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panelTitles = compiled.querySelectorAll('.panel-title');
    expect(panelTitles.length).toBeGreaterThan(0);
    expect(panelTitles[0].textContent).toContain('Panel with header');
  });

  it('should render all contextual panel variants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.panel-default')).toBeTruthy();
    expect(compiled.querySelector('.panel-primary')).toBeTruthy();
    expect(compiled.querySelector('.panel-success')).toBeTruthy();
    expect(compiled.querySelector('.panel-info')).toBeTruthy();
    expect(compiled.querySelector('.panel-warning')).toBeTruthy();
    expect(compiled.querySelector('.panel-danger')).toBeTruthy();
  });

  it('should render panel group with two panels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panelGroup = compiled.querySelector('.panel-group');
    expect(panelGroup).toBeTruthy();
    const groupPanels = panelGroup?.querySelectorAll('.panel');
    expect(groupPanels?.length).toBe(2);
  });

  it('should render bootstrap panel with footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panelFooter = compiled.querySelector('.panel-footer');
    expect(panelFooter).toBeTruthy();
    expect(panelFooter?.textContent).toContain('Panel Footer');
  });
});
