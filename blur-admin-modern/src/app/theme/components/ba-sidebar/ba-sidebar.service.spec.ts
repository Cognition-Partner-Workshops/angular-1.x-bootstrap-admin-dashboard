import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { BaSidebarService } from './ba-sidebar.service';

describe('BaSidebarService', () => {
  const events = new Subject<unknown>();
  const router = {
    url: '/ui/buttons',
    events,
    config: [{
      path: '',
      component: class LayoutComponent {},
      children: [
        { path: 'ui', data: { title: 'UI', sidebarMeta: { icon: 'ui', order: 20 } }, children: [
          { path: 'buttons', data: { title: 'Buttons', sidebarMeta: { order: 1 } } },
          { path: 'alerts', data: { title: 'Alerts', sidebarMeta: { order: 0 } } },
        ] },
        { path: 'dashboard', data: { title: 'Dashboard', sidebarMeta: { icon: 'home', order: 0 } } },
        { path: 'excluded', data: { title: 'Hidden' } },
      ],
    }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: router }] });
  });

  it('creates and builds sorted menu levels with nested paths', () => {
    const service = TestBed.inject(BaSidebarService);
    const items = service.getMenuItems();
    expect(items.map((item) => item.title)).toEqual(['Dashboard', 'UI']);
    expect(items[1].stateRef).toBe('/ui');
    expect(items[1].subMenu?.map((item) => item.title)).toEqual(['Alerts', 'Buttons']);
    expect(items.some((item) => item.title === 'Hidden')).toBeFalse();
  });

  it('appends static items and recursively finds state refs', () => {
    const service = TestBed.inject(BaSidebarService);
    const staticItem = { title: 'Static', subMenu: [{ title: 'Child', stateRef: '/child' }] };
    service.addStaticItem(staticItem);
    expect(service.getMenuItems().at(-1)).toBe(staticItem);
    expect(service.getAllStateRefsRecursive(staticItem)).toEqual(['/child']);
  });

  it('controls collapsed state and closes on narrow navigation', () => {
    const service = TestBed.inject(BaSidebarService);
    service.setMenuCollapsed(false);
    expect(service.isMenuCollapsed()).toBeFalse();
    service.toggleMenuCollapsed();
    expect(service.isMenuCollapsed()).toBeTrue();
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(400);
    expect(service.shouldMenuBeCollapsed()).toBeTrue();
    expect(service.canSidebarBeHidden()).toBeTrue();
    service.setMenuCollapsed(false);
    events.next(new NavigationEnd(1, '/x', '/x'));
    expect(service.isMenuCollapsed()).toBeTrue();
  });
});
