import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContextualAccordionComponent } from './contextual-accordion.component';
@Component({ standalone: true, imports: [ContextualAccordionComponent], template: '<app-ui-contextual-accordion />' }) class Host {}
describe('ContextualAccordionComponent', () => { beforeEach(() => TestBed.configureTestingModule({ imports: [Host] })); it('renders all contextual panel classes', () => { const f = TestBed.createComponent(Host); f.detectChanges(); expect(f.nativeElement.querySelectorAll('[ngbaccordionitem]').length).toBe(5); for (const c of ['panel-primary','panel-success','panel-info','panel-warning','panel-danger']) expect(f.nativeElement.querySelector('.' + c)).toBeTruthy(); }); });
