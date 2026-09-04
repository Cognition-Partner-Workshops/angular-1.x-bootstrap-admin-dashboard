import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { ThemeRunService } from '../theme/services/theme-run.service';

describe('LayoutComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({
    imports: [LayoutComponent],
    providers: [{ provide: ThemeRunService, useValue: { run: jasmine.createSpy('run') } }],
  }).compileComponents());
  it('creates the shell and starts theme loading', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(TestBed.inject(ThemeRunService).run).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#preloader')).toBeTruthy();
  });
});
