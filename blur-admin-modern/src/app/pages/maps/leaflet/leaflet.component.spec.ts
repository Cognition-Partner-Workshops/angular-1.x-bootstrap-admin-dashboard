import { TestBed } from '@angular/core/testing';
import { LeafletComponent } from './leaflet.component';

describe('LeafletComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LeafletComponent] }).compileComponents();
  });

  it('creates a Leaflet map with the legacy marker and popup', () => {
    const fixture = TestBed.createComponent(LeafletComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.widgets .row .col-md-12 ba-panel')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#leaflet-map')).toHaveClass('leaflet-container');
    expect(fixture.nativeElement.querySelectorAll('.leaflet-marker-icon').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('A pretty CSS3 popup.');
    expect(fixture.componentInstance.map).toBeTruthy();
  });
});
