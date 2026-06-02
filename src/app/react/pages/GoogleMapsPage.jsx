import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function GoogleMapsPage() {
  var mapRef = useRef(null);
  var mapInstanceRef = useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (!mapRef.current || !window.google || !window.google.maps) return;
      var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
    }, 100);

    return function () {
      clearTimeout(timer);
      mapInstanceRef.current = null;
    };
  }, []);

  return React.createElement(Panel, { title: 'Google Maps', panelClass: 'viewport100' },
    React.createElement('div', { id: 'google-maps', ref: mapRef })
  );
}
