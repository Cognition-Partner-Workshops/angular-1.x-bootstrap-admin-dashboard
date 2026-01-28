import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 basic alerts', () => {
    expect(component.basicAlerts.length).toBe(4);
  });

  it('should have 4 dismissible alerts', () => {
    expect(component.dismissibleAlerts.length).toBe(4);
  });

  it('should have 4 link alerts', () => {
    expect(component.linkAlerts.length).toBe(4);
  });

  it('should have all alert types in basic alerts', () => {
    const types = component.basicAlerts.map(a => a.type);
    expect(types).toContain('success');
    expect(types).toContain('info');
    expect(types).toContain('warning');
    expect(types).toContain('danger');
  });

  it('should dismiss alert when dismissAlert is called', () => {
    const alertId = 'dismiss-success';
    expect(component.dismissibleAlerts.find(a => a.id === alertId)?.visible).toBeTrue();
    
    component.dismissAlert(alertId);
    
    expect(component.dismissibleAlerts.find(a => a.id === alertId)?.visible).toBeFalse();
  });

  it('should return correct alert class', () => {
    expect(component.getAlertClass('success')).toBe('alert bg-success');
    expect(component.getAlertClass('info')).toBe('alert bg-info');
    expect(component.getAlertClass('warning')).toBe('alert bg-warning');
    expect(component.getAlertClass('danger')).toBe('alert bg-danger');
  });

  it('should render basic alerts panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panel = compiled.querySelector('[data-testid="basic-alerts-panel"]');
    expect(panel).toBeTruthy();
    expect(panel?.querySelector('.panel-heading')?.textContent).toContain('Basic');
  });

  it('should render dismissible alerts panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panel = compiled.querySelector('[data-testid="dismissible-alerts-panel"]');
    expect(panel).toBeTruthy();
    expect(panel?.querySelector('.panel-heading')?.textContent).toContain('Dismissible alerts');
  });

  it('should render links alerts panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panel = compiled.querySelector('[data-testid="links-alerts-panel"]');
    expect(panel).toBeTruthy();
    expect(panel?.querySelector('.panel-heading')?.textContent).toContain('Links in alerts');
  });

  it('should render composite alerts panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const panel = compiled.querySelector('[data-testid="composite-alerts-panel"]');
    expect(panel).toBeTruthy();
    expect(panel?.querySelector('.panel-heading')?.textContent).toContain('Composite alerts');
  });

  it('should render close buttons for dismissible alerts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const closeButtons = compiled.querySelectorAll('[data-testid^="dismiss-btn-"]');
    expect(closeButtons.length).toBe(4);
  });

  it('should hide alert when close button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const closeButton = compiled.querySelector('[data-testid="dismiss-btn-success"]') as HTMLButtonElement;
    const alertBefore = compiled.querySelector('[data-testid="dismissible-alert-success"]');
    expect(alertBefore).toBeTruthy();

    closeButton.click();
    fixture.detectChanges();

    const alertAfter = compiled.querySelector('[data-testid="dismissible-alert-success"]');
    expect(alertAfter).toBeFalsy();
  });

  it('should render composite alert with action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const payAttentionBtn = compiled.querySelector('[data-testid="pay-attention-btn"]');
    const ignoreBtn = compiled.querySelector('[data-testid="ignore-btn"]');
    expect(payAttentionBtn).toBeTruthy();
    expect(ignoreBtn).toBeTruthy();
  });
});
