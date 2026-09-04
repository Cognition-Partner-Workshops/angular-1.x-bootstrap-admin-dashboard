import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MainTabsComponent } from './main-tabs.component';
@Component({ standalone: true, imports: [MainTabsComponent], template: '<app-ui-main-tabs />' }) class Host {}
describe('MainTabsComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  it('renders three nav items and the start content', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    expect(f.nativeElement.querySelectorAll('ul.nav-tabs > li').length).toBe(3);
    expect(f.nativeElement.textContent).toContain('Take up one idea');
  });

  it('switches tabs and supports dropdown tab 2', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const child = f.debugElement.query(By.directive(MainTabsComponent)).componentInstance as MainTabsComponent;
    const links = f.nativeElement.querySelectorAll('a[ngbnavlink]');
    links[1].click();
    f.detectChanges();
    expect(child.activeTab).toBe(2);

    f.nativeElement.querySelector('.with-dropdown .nav-link').click();
    f.detectChanges();
    const items = f.nativeElement.querySelectorAll('.dropdown-menu a');
    items[1].click();
    f.detectChanges();
    expect(child.activeTab).toBe(3);
    const dummyButton = (Array.from(f.nativeElement.querySelectorAll('button')) as HTMLButtonElement[])
      .find((button) => button.textContent.includes('dummy button'));
    expect(dummyButton).toBeTruthy();
  });
});
