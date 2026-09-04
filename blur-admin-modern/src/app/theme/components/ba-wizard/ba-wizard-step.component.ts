import { Component, input, signal } from '@angular/core';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'ba-wizard-step',
  standalone: true,
  template: `<section class="step" [hidden]="!selected()"><ng-content /></section>`,
})
export class BaWizardStepComponent {
  readonly title = input('');
  readonly form = input<NgForm | FormGroup | undefined>();
  readonly selected = signal(false);
  previous?: BaWizardStepComponent;

  submit(): void {
    const form = this.form();
    if (form instanceof NgForm) {
      form.onSubmit(new Event('submit'));
    } else if (form instanceof FormGroup) {
      form.markAllAsTouched();
    }
  }

  isComplete(): boolean {
    return this.form()?.valid ?? true;
  }

  isAvailable(): boolean {
    return this.previous ? this.previous.isComplete() : true;
  }
}
