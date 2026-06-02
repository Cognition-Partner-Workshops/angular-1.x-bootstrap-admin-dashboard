/**
 * LeafletPage — React port of LeafletPageCtrl + leaflet.html.
 */
import React, { useEffect, useState } from 'react';
import { Panel } from '../components/Panel';
import { GlobeLoader } from '../components/GlobeLoader';

export function LeafletPage() {
  var [loading, setLoading] = useState(true);

  useEffect(function () {
    var L = window.L;
    var map;
    var timer = setTimeout(function () {
      if (L) {
        L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
        map = L.map(document.getElementById('leaflet-map')).setView([51.505, -0.09], 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
      }
      setLoading(false);
    }, 100);

    return function () {
      clearTimeout(timer);
      if (map && map.remove) {
        map.remove();
      }
    };
  }, []);

  return React.createElement(
    Panel,
    { title: 'Leaflet', panelClass: 'viewport100' },
    React.createElement('div', { style: { position: 'relative', height: '100%' } },
      React.createElement('div', { id: 'leaflet-map' }),
      loading ? React.createElement(GlobeLoader) : null
    )
  );
}
