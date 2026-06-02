import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

/**
 * Leaflet Maps page — migrated from LeafletPageCtrl.
 * Initializes a Leaflet map with an OSM tile layer and a marker popup.
 */
export function LeafletPage() {
  const containerRef = useRef(null);

  useEffect(function () {
    let cancelled = false;
    let map = null;

    function init() {
      if (cancelled || !containerRef.current) return;
      var L = window.L;
      if (!L) {
        setTimeout(init, 100);
        return;
      }
      L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
      map = L.map(containerRef.current).setView([51.505, -0.09], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    }

    init();

    return function () {
      cancelled = true;
      try { if (map && map.remove) map.remove(); } catch (e) { /* noop */ }
    };
  }, []);

  return React.createElement(Panel, { title: 'Leaflet', panelClass: 'viewport100' },
    React.createElement('div', { id: 'leaflet-map', ref: containerRef })
  );
}
