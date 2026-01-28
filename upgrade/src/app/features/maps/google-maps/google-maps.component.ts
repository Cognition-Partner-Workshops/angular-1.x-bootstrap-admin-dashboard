import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BaPanelComponent } from '../../../shared/components/ba-panel';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, BaPanelComponent],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  center: google.maps.LatLngLiteral = {
    lat: 44.5403,
    lng: -78.5463
  };

  zoom = 8;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 3
  };

  markerPosition: google.maps.LatLngLiteral = {
    lat: 44.5403,
    lng: -78.5463
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }

  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker);
  }
}
