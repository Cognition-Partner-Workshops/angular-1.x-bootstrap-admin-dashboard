import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetsComponent } from './widgets.component';

@Component({ standalone: true, imports: [WidgetsComponent], template: `<ng-template #tpl>Widget content</ng-template><widgets [widgets]="blocks" />` })
class WidgetsHost {
  @ViewChild('tpl') template!: TemplateRef<unknown>;
  blocks = [{ widgets: [] as { title: string; template: TemplateRef<unknown> }[][] }];
}

describe('WidgetsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [WidgetsHost] }).compileComponents());
  it('creates and renders the widgets container', () => {
    const fixture = TestBed.createComponent(WidgetsHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.widgets')).toBeTruthy();
  });
});
