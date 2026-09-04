import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { BaWizardStepComponent } from './ba-wizard-step.component';

@Component({
  standalone: true,
  imports: [BaWizardStepComponent, ReactiveFormsModule],
  template: '<ba-wizard-step [form]="form"></ba-wizard-step>',
})
class WizardStepHost {
  form = new FormGroup({ name: new FormControl('', { nonNullable: true, validators: Validators.required }) });
}

describe('BaWizardStepComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [WizardStepHost] }));

  it('creates', () => expect(TestBed.createComponent(WizardStepHost)).toBeTruthy());

  it('reports validity and marks a reactive form as submitted', () => {
    const fixture = TestBed.createComponent(WizardStepHost);
    fixture.detectChanges();
    const step = fixture.debugElement.query(By.directive(BaWizardStepComponent)).componentInstance as BaWizardStepComponent;
    const form = fixture.componentInstance.form;
    step.submit();
    expect(form.touched).toBeTrue();
    expect(step.isComplete()).toBeFalse();
    form.controls.name.setValue('valid');
    expect(step.isComplete()).toBeTrue();
  });
});
