import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BaSidebarService } from '../ba-sidebar/ba-sidebar.service';
import { PageTopComponent } from './page-top.component';

describe('PageTopComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PageTopComponent], providers: [provideRouter([])] }).compileComponents();
  });
  it('creates and renders the logo, search, profile and message center', () => {
    const fixture = TestBed.createComponent(PageTopComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.al-logo').textContent).toContain('BlurAdmin');
    expect(fixture.nativeElement.querySelector('#searchInput')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('msg-center')).toBeTruthy();
  });
  it('marks toggle events and changes sidebar state', () => {
    const service = TestBed.inject(BaSidebarService);
    const event = new MouseEvent('click') as MouseEvent & { $sidebarEventProcessed?: boolean };
    const initial = service.isMenuCollapsed();
    TestBed.createComponent(PageTopComponent).componentInstance.toggleMenu(event);
    expect(event.$sidebarEventProcessed).toBeTrue();
    expect(service.isMenuCollapsed()).toBe(!initial);
  });
});
