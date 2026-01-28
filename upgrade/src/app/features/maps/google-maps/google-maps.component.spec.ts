import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapsComponent, GoogleMapsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial center coordinates matching legacy', () => {
    expect(component.center.lat).toBe(44.5403);
    expect(component.center.lng).toBe(-78.5463);
  });

  it('should have correct initial zoom level matching legacy', () => {
    expect(component.zoom).toBe(8);
  });

  it('should have roadmap as default map type matching legacy', () => {
    expect(component.options.mapTypeId).toBe('roadmap');
  });

  it('should have initial marker position at center', () => {
    expect(component.markerPosition.lat).toBe(44.5403);
    expect(component.markerPosition.lng).toBe(-78.5463);
  });

  it('should update marker position on map click', () => {
    const mockEvent = {
      latLng: {
        lat: () => 45.0,
        lng: () => -79.0
      }
    } as google.maps.MapMouseEvent;

    component.onMapClick(mockEvent);

    expect(component.markerPosition.lat).toBe(45.0);
    expect(component.markerPosition.lng).toBe(-79.0);
  });

  it('should not update marker position if latLng is null', () => {
    const originalPosition = { ...component.markerPosition };
    const mockEvent = {
      latLng: null
    } as google.maps.MapMouseEvent;

    component.onMapClick(mockEvent);

    expect(component.markerPosition.lat).toBe(originalPosition.lat);
    expect(component.markerPosition.lng).toBe(originalPosition.lng);
  });
});
