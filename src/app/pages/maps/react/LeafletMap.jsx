import React, { useEffect, useRef } from 'react';
import Panel from './Panel';

function LeafletMap() {
  var mapRef = useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (typeof L !== 'undefined' && mapRef.current) {
        L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';
        var map = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
      }
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <Panel title="Leaflet" className="viewport100">
      <div id="leaflet-map" ref={mapRef}></div>
    </Panel>
  );
}

export default LeafletMap;
