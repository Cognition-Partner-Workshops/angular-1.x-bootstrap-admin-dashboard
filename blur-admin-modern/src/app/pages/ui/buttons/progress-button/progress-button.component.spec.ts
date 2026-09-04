import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProgressButtonComponent } from './progress-button.component';

@Component({
  standalone: true,
  imports: [ProgressButtonComponent],
  template: `
    <button [progressButton]="resolve" class="btn">Default</button>
    <button [progressButton]="resolve" pbStyle="lateral-lines" class="btn">Lateral</button>
    <button [progressButton]="resolve" pbStyle="rotate-angle-bottom" class="btn">Perspective</button>
    <button [progressButton]="resolve" pbDirection="vertical" class="btn">Vertical</button>
  `,
})
class ProgressHostComponent {
  calls = 0;
  resolve: () => Promise<unknown> = () => {
    this.calls++;
    return Promise.resolve();
  };
}

describe('ProgressButtonComponent', () => {
  let fixture: ComponentFixture<ProgressHostComponent>;
  let resolve: (value?: unknown) => void;
  let reject: (reason?: unknown) => void;
  let promise: Promise<unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProgressHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProgressHostComponent);
    promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    fixture.componentInstance.resolve = () => {
      fixture.componentInstance.calls++;
      return promise;
    };
    fixture.detectChanges();
  });

  it('applies the default and configured host classes', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].className).toContain('progress-button progress-button-dir-horizontal progress-button-style-fill');
    expect(buttons[1].classList).toContain('progress-button-dir-vertical');
    expect(buttons[2].classList).toContain('progress-button-perspective');
    expect(buttons[2].querySelector('.progress-wrap')).toBeTruthy();
    expect(buttons[3].classList).toContain('progress-button-dir-vertical');
  });

  it('runs once, reports progress and resolves successfully', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(button.classList).toContain('state-loading');
    expect(button.classList).toContain('disabled');
    button.click();
    expect(fixture.componentInstance.calls).toBe(1);
    tick(200);
    fixture.detectChanges();
    expect(parseFloat((button.querySelector('.progress-inner') as HTMLElement).style.width)).toBeGreaterThan(0);
    resolve();
    tick();
    fixture.detectChanges();
    expect(button.classList).not.toContain('state-loading');
    expect(button.classList).toContain('state-success');
    expect((button.querySelector('.progress-inner') as HTMLElement).style.width).toBe('100%');
    tick(1500);
    fixture.detectChanges();
    expect(button.classList).not.toContain('state-success');
    expect(button.classList).not.toContain('disabled');
  }));

  it('reports rejected operations as errors', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    reject();
    tick();
    fixture.detectChanges();
    expect(button.classList).toContain('state-error');
    expect(button.classList).not.toContain('state-loading');
  }));
});
