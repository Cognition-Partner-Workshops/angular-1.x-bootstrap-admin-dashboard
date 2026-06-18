import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map-widget',
  standalone: true,
  template: `
    <div #mapContainer class="map-container"></div>
  `,
  styles: [`
    .map-container {
      height: 350px;
      width: 100%;
      background: #e8eaed;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class MapWidgetComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngAfterViewInit(): void {
    import('leaflet').then(L => {
      const map = L.map(this.mapContainer.nativeElement).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const markers = [
        { lat: 40.7128, lng: -74.006, label: 'USA: 4,612' },
        { lat: 51.5074, lng: -0.1278, label: 'UK: 1,245' },
        { lat: 48.8566, lng: 2.3522, label: 'France: 968' },
        { lat: 35.6762, lng: 139.6503, label: 'Japan: 812' },
        { lat: -33.8688, lng: 151.2093, label: 'Australia: 543' },
      ];

      markers.forEach(m => {
        L.circleMarker([m.lat, m.lng], {
          radius: 8, fillColor: '#209e91', fillOpacity: 0.8, color: '#fff', weight: 2,
        }).addTo(map).bindPopup(m.label);
      });

      setTimeout(() => map.invalidateSize(), 200);
    });
  }
}
