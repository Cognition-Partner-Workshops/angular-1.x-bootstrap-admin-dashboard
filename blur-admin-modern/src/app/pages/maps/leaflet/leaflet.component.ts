import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { BaPanelComponent } from '../../../theme';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <div class="widgets">
      <div class="row">
        <div class="col-md-12">
          <ba-panel title="Leaflet" baPanelClass="viewport100">
            <div id="leaflet-map" #map></div>
          </ba-panel>
        </div>
      </div>
    </div>
  `,
})
export class LeafletComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map', { static: true }) private readonly mapElement!: ElementRef<HTMLElement>;
  map?: L.Map;

  ngAfterViewInit(): void {
    (L.Icon.Default as typeof L.Icon.Default & { imagePath: string }).imagePath = 'assets/vendor/leaflet/images/';
    this.map = L.map(this.mapElement.nativeElement).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker([51.5, -0.09]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
