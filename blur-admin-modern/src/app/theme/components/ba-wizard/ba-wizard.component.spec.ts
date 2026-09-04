import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { BaWizardComponent } from './ba-wizard.component';
import { BaWizardStepComponent } from './ba-wizard-step.component';

@Component({
  standalone: true,
  imports: [BaWizardComponent, BaWizardStepComponent, ReactiveFormsModule],
  template: `
    <ba-wizard>
      <ba-wizard-step title="One" [form]="first"></ba-wizard-step>
      <ba-wizard-step title="Two" [form]="second"></ba-wizard-step>
      <ba-wizard-step title="Three"></ba-wizard-step>
    </ba-wizard>
  `,
})
class WizardHost {
  first = new FormGroup({ name: new FormControl('first', { nonNullable: true }) });
  second = new FormGroup({ name: new FormControl('', { nonNullable: true, validators: Validators.required }) });
}

describe('BaWizardComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [WizardHost] }));

  it('creates', () => expect(TestBed.createComponent(WizardHost)).toBeTruthy());

  it('gates navigation on step validity and updates progress', () => {
    const fixture = TestBed.createComponent(WizardHost);
    fixture.detectChanges();
    const wizard = fixture.debugElement.query(By.directive(BaWizardComponent)).componentInstance as BaWizardComponent;
    expect(wizard.tabNum()).toBe(0);
    expect(wizard.progress()).toBeCloseTo(33.33, 1);
    wizard.nextTab();
    expect(wizard.tabNum()).toBe(1);
    wizard.nextTab();
    expect(wizard.tabNum()).toBe(1);
    expect(wizard.progress()).toBeCloseTo(66.67, 1);
    fixture.componentInstance.second.controls.name.setValue('valid');
    wizard.nextTab();
    expect(wizard.tabNum()).toBe(2);
    expect(wizard.progress()).toBe(100);
  });
});
