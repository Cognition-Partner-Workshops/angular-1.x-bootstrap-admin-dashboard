import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaWizardComponent } from '../../../theme';
import { WizardComponent } from './wizard.component';

describe('WizardComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [WizardComponent] }).compileComponents());
  it('renders four steps and advances when required personal info is filled', async () => {
    const fixture = TestBed.createComponent(WizardComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ba-wizard-step').length).toBe(4);
    const wizard = fixture.nativeElement.querySelector('ba-wizard');
    expect(wizard.textContent).toContain('Personal info');
    expect(wizard.textContent).toContain('Congratulations!');
    const wizardInstance = fixture.debugElement.query(By.directive(BaWizardComponent)).componentInstance as BaWizardComponent;
    wizardInstance.nextTab();
    expect(wizardInstance.tabNum()).toBe(0);

    fixture.componentInstance.personalInfo.username = 'user';
    fixture.componentInstance.personalInfo.email = 'user@example.com';
    fixture.componentInstance.personalInfo.password = 'secret';
    fixture.componentInstance.personalInfo.confirmPassword = 'different';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    wizardInstance.nextTab();
    expect(wizardInstance.tabNum()).toBe(1);

    expect(fixture.componentInstance.arePersonalInfoPasswordsEqual()).toBeFalse();
    fixture.componentInstance.personalInfo.password = 'secret';
    fixture.componentInstance.personalInfo.confirmPassword = 'secret';
    expect(fixture.componentInstance.arePersonalInfoPasswordsEqual()).toBeTrue();
  });
});
