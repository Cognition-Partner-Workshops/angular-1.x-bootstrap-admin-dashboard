import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ContentTopComponent } from './content-top.component';

describe('ContentTopComponent', () => {
  const route = { snapshot: { root: { data: {}, firstChild: { data: { title: 'Dashboard' }, firstChild: null } } } };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTopComponent],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: route }],
    }).compileComponents();
  });
  it('renders the deepest activated route title and home breadcrumb', () => {
    const fixture = TestBed.createComponent(ContentTopComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.al-title').textContent).toContain('Dashboard');
    expect(fixture.nativeElement.querySelector('a').textContent).toBe('Home');
  });
});
