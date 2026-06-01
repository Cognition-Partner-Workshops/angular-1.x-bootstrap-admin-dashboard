import { react2angular } from 'react2angular';
import GoogleMaps from './GoogleMaps';
import LeafletMap from './LeafletMap';
import MapBubbles from './MapBubbles';
import MapLines from './MapLines';

angular.module('BlurAdmin.pages.maps')
  .component('reactGoogleMaps', react2angular(GoogleMaps, []))
  .component('reactLeafletMap', react2angular(LeafletMap, []))
  .component('reactMapBubbles', react2angular(MapBubbles, []))
  .component('reactMapLines', react2angular(MapLines, []));
