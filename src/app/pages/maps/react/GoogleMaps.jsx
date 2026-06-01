import React, { useEffect, useRef } from 'react';
import Panel from './Panel';

function GoogleMaps() {
  var mapRef = useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (typeof google !== 'undefined' && mapRef.current) {
        var mapOptions = {
          center: new google.maps.LatLng(44.5403, -78.5463),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Map(mapRef.current, mapOptions);
      }
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <Panel title="Google Maps" className="viewport100">
      <div id="google-maps" ref={mapRef}></div>
    </Panel>
  );
}

export default GoogleMaps;
