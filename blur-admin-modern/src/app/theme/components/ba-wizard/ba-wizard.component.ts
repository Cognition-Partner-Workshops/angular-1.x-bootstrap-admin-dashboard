import { AfterContentInit, Component, contentChildren, signal } from '@angular/core';
import { BaWizardStepComponent } from './ba-wizard-step.component';

@Component({
  selector: 'ba-wizard',
  standalone: true,
  imports: [],
  template: `
    <div class="ba-wizard">
      <div class="ba-wizard-navigation-container">
        @for (step of tabs(); track $index) {
          <div class="ba-wizard-navigation" [class.active]="tabNum() === $index" (click)="selectTab($index)">
            {{ step.title() }}
          </div>
        }
      </div>
      <div class="progress ba-wizard-progress">
        <div class="progress-bar bg-danger progress-bar-striped progress-bar-animated"
             role="progressbar" [style.width.%]="progress()"
             aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div class="steps"><ng-content /></div>
      <nav>
        <ul class="pagination ba-wizard-pager justify-content-between">
          <li class="previous">
            <button [disabled]="isFirstTab()" (click)="previousTab()" type="button" class="btn btn-primary">
              <span aria-hidden="true">&larr;</span> previous
            </button>
          </li>
          <li class="next">
            <button [disabled]="isLastTab()" (click)="nextTab()" type="button" class="btn btn-primary">
              next <span aria-hidden="true">&rarr;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
})
export class BaWizardComponent implements AfterContentInit {
  readonly tabs = contentChildren(BaWizardStepComponent);
  readonly tabNum = signal(0);

  progress(): number {
    return this.tabs().length ? ((this.tabNum() + 1) / this.tabs().length) * 100 : 0;
  }

  ngAfterContentInit(): void {
    this.tabs().forEach((step, index) => {
      step.previous = this.tabs()[index - 1];
      step.selected.set(index === 0);
    });
  }

  selectTab(index: number): void {
    const current = this.tabs()[this.tabNum()];
    const target = this.tabs()[index];
    if (!target || !target.isAvailable()) return;
    current?.submit();
    if (!target.isAvailable()) return;
    this.tabs().forEach((step, i) => step.selected.set(i === index));
    this.tabNum.set(index);
  }

  isFirstTab(): boolean {
    return this.tabNum() === 0;
  }

  isLastTab(): boolean {
    return this.tabNum() >= this.tabs().length - 1;
  }

  nextTab(): void {
    if (!this.isLastTab()) this.selectTab(this.tabNum() + 1);
  }

  previousTab(): void {
    if (!this.isFirstTab()) this.selectTab(this.tabNum() - 1);
  }
}
