/**
 * GoogleMapsPage — React port of GmapPageCtrl + google-maps.html.
 */
import React, { useEffect } from 'react';
import { Panel } from '../components/Panel';

export function GoogleMapsPage() {
  useEffect(function () {
    var timer = setTimeout(function () {
      var google = window.google;
      if (!google || !google.maps) {
        return;
      }
      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      new google.maps.Map(mapCanvas, mapOptions);
    }, 100);

    return function () {
      clearTimeout(timer);
    };
  }, []);

  return React.createElement(
    Panel,
    { title: 'Google Maps', panelClass: 'viewport100' },
    React.createElement('div', { id: 'google-maps' })
  );
}
