import { TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertsComponent] }).compileComponents();
  });

  it('renders the four panels and thirteen alerts', () => {
    const fixture = TestBed.createComponent(AlertsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.panel-heading').length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('.alert').length).toBe(13);
  });

  it('dismisses a closeable alert', () => {
    const fixture = TestBed.createComponent(AlertsComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.close').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.alert').length).toBe(12);
  });
});
