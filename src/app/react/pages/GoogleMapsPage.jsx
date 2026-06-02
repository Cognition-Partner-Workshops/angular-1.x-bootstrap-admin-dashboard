import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function GoogleMapsPage() {
  var mapRef = useRef(null);

  useEffect(function () {
    if (!mapRef.current) return;
    var mapOptions = {
      center: new google.maps.LatLng(44.5403, -78.5463),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    new google.maps.Map(mapRef.current, mapOptions);
  }, []);

  return React.createElement(
    Panel,
    { title: 'Google Maps', panelClass: 'viewport100' },
    React.createElement('div', { id: 'google-maps', ref: mapRef })
  );
}
