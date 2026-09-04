import { TestBed } from '@angular/core/testing';
import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [IconsComponent] }).compileComponents());

  it('renders all icon collections and panel titles', () => {
    const fixture = TestBed.createComponent(IconsComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance).toBeTruthy();
    expect(element.querySelectorAll('.kameleon-icon:not(.with-round-bg) img').length).toBe(
      fixture.componentInstance.kameleonIcons.length,
    );
    expect(element.querySelectorAll('.with-round-bg img').length).toBe(fixture.componentInstance.kameleonRoundedIcons.length);
    expect(element.querySelectorAll('.icons-list.primary i').length).toBe(fixture.componentInstance.ionicons.length);
    expect(element.querySelectorAll('.awesomeIcons i').length).toBe(fixture.componentInstance.fontAwesomeIcons.length);
    expect(element.querySelectorAll('.icons-list.danger i.socicon').length).toBe(fixture.componentInstance.socicon.length);
    expect((element.querySelector('.kameleon-icon:not(.with-round-bg) img') as HTMLImageElement).src).toContain(
      'assets/img/theme/icon/kameleon/Beach.svg',
    );
    expect(element.querySelector('.with-round-bg.success')).toBeTruthy();
    expect([...element.querySelectorAll('.panel-title')].map((el) => el.textContent?.trim())).toEqual([
      'Kameleon SVG Icons', 'Socicon', 'Icons With Rounded Background', 'ionicons', 'Font Awesome Icons',
    ]);
  });
});
