import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, marker, icon, Map, Layer, Icon } from 'leaflet';
import { BaPanelComponent } from '../../../shared/components/ba-panel';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [CommonModule, LeafletModule, BaPanelComponent],
  templateUrl: './leaflet.component.html',
  styleUrl: './leaflet.component.scss'
})
export class LeafletComponent implements OnInit, AfterViewInit {
  options = {
    layers: [] as Layer[],
    zoom: 13,
    center: latLng(51.505, -0.09)
  };

  layers: Layer[] = [];

  private map: Map | null = null;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  onMapReady(map: Map): void {
    this.map = map;
  }

  private initializeMap(): void {
    const defaultIcon = icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png'
    });

    this.options.layers = [
      tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })
    ];

    this.layers = [
      marker([51.5, -0.09], { icon: defaultIcon })
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    ];
  }
}
