import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SideTabsComponent } from './side-tabs.component';
@Component({ standalone: true, imports: [SideTabsComponent], template: '<app-ui-side-tabs />' }) class Host {}
describe('SideTabsComponent', () => { beforeEach(() => TestBed.configureTestingModule({ imports: [Host] })); it('renders both vertical tab panels and icons', () => { const f = TestBed.createComponent(Host); f.detectChanges(); expect(f.nativeElement.querySelectorAll('.panel').length).toBe(2); expect(f.nativeElement.querySelector('.tabs-left')).toBeTruthy(); expect(f.nativeElement.querySelector('.tabs-right')).toBeTruthy(); expect(f.nativeElement.querySelector('img').src).toMatch(/Key\.svg$/); expect(f.nativeElement.querySelectorAll('img')[1].src).toMatch(/Phone-Booth\.svg$/); }); });
