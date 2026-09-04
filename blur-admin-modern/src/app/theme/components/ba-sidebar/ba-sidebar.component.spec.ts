import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BaSidebarComponent } from './ba-sidebar.component';
import { BaMenuItem, BaSidebarService } from './ba-sidebar.service';

describe('BaSidebarComponent', () => {
  const router = { url: '/dashboard', events: new Subject<unknown>(), config: [] };
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BaSidebarComponent], providers: [{ provide: Router, useValue: router }] }).compileComponents();
  });

  it('creates and renders the sidebar', () => {
    const fixture = TestBed.createComponent(BaSidebarComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.al-sidebar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.al-sidebar-list')).toBeTruthy();
  });

  it('expands a submenu and opens a collapsed sidebar before toggling', () => {
    const item: BaMenuItem = { title: 'Menu', subMenu: [{ title: 'Child' }] };
    const service = TestBed.inject(BaSidebarService);
    service.addStaticItem(item);
    const fixture = TestBed.createComponent(BaSidebarComponent);
    const component = fixture.componentInstance;
    expect(component.menuItems).toContain(item);
    component.sidebar.setMenuCollapsed(true);
    component.toggleSubMenu(new MouseEvent('click'), item);
    expect(component.sidebar.isMenuCollapsed()).toBeFalse();
    expect(item.expanded).toBeTrue();
  });

  it('refreshes menu items when a lazy route config loads', () => {
    const service = TestBed.inject(BaSidebarService);
    const newItem: BaMenuItem = { title: 'Lazy item', stateRef: '/lazy-item' };
    spyOn(service, 'getMenuItems').and.returnValue([newItem]);
    const fixture = TestBed.createComponent(BaSidebarComponent);
    const component = fixture.componentInstance;

    router.events.next(new RouteConfigLoadEnd({} as Route));

    expect(component.menuItems).toContain(newItem);
  });
});
