import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function LeafletPage() {
  var mapRef = useRef(null);
  var mapInstanceRef = useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (!mapRef.current || !window.L) return;
      L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
      var map = L.map(mapRef.current).setView([51.505, -0.09], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      mapInstanceRef.current = map;
    }, 100);

    return function () {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return React.createElement(Panel, { title: 'Leaflet', panelClass: 'viewport100' },
    React.createElement('div', { id: 'leaflet-map', ref: mapRef })
  );
}
