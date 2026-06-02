import React, { useEffect, useRef, useState } from 'react';
import { Panel } from '../components/Panel';
import { GlobeSpinner } from '../components/GlobeSpinner';

/**
 * Google Maps page — migrated from GmapPageCtrl.
 * Initializes a google.maps.Map inside the #google-maps container.
 */
export function GoogleMapsPage() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    let cancelled = false;

    function init() {
      if (cancelled || !containerRef.current) return;
      var google = window.google;
      if (!google || !google.maps) {
        setTimeout(init, 100);
        return;
      }
      new google.maps.Map(containerRef.current, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      if (!cancelled) setLoading(false);
    }

    init();

    return function () {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return React.createElement(Panel, { title: 'Google Maps', panelClass: 'viewport100' },
    React.createElement('div', { style: { position: 'relative' } },
      React.createElement('div', { id: 'google-maps', ref: containerRef }),
      React.createElement(GlobeSpinner, { visible: loading })
    )
  );
}
