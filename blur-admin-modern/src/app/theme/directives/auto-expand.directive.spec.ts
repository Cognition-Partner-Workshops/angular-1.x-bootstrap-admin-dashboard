import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AutoExpandDirective } from './auto-expand.directive';

@Component({ standalone: true, imports: [AutoExpandDirective], template: '<textarea autoExpand></textarea>' })
class AutoExpandHost {}

describe('AutoExpandDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AutoExpandHost] }));

  it('creates', () => expect(TestBed.createComponent(AutoExpandHost)).toBeTruthy());

  it('sets textarea height to at least 16px', fakeAsync(() => {
    const fixture = TestBed.createComponent(AutoExpandHost);
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 40 });
    fixture.detectChanges();
    tick();
    textarea.dispatchEvent(new Event('keydown'));
    expect(parseInt(textarea.style.height, 10)).toBeGreaterThanOrEqual(16);
  }));
});
