/**
 * AngularJS bridges that mount the migrated React map pages.
 * baConfig and layoutPaths are injected here and passed as props, so the
 * React components never read them off the global window object.
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maps')
      .directive('googleMapsReact', googleMapsReact)
      .directive('leafletReact', leafletReact)
      .directive('mapBubblesReact', mapBubblesReact)
      .directive('mapLinesReact', mapLinesReact);

  function mount(componentName, element, props) {
    var lib = window.BlurAdminReact;
    if (!lib || !lib[componentName]) {
      element.html('<p class="text-danger">React bundle not loaded.</p>');
      return null;
    }
    return lib.mountReactApp(lib[componentName], element[0], props || {});
  }

  function unmountOnDestroy(scope, root) {
    scope.$on('$destroy', function () {
      setTimeout(function () { if (root) root.unmount(); }, 0);
    });
  }

  function googleMapsReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('GoogleMapsPage', element, {});
        unmountOnDestroy(scope, root);
      },
    };
  }

  function leafletReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('LeafletPage', element, {});
        unmountOnDestroy(scope, root);
      },
    };
  }

  /** @ngInject */
  function mapBubblesReact(baConfig, layoutPaths) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('MapBubblesPage', element, { baConfig: baConfig, layoutPaths: layoutPaths });
        unmountOnDestroy(scope, root);
      },
    };
  }

  /** @ngInject */
  function mapLinesReact(baConfig, layoutPaths) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('MapLinesPage', element, { baConfig: baConfig, layoutPaths: layoutPaths });
        unmountOnDestroy(scope, root);
      },
    };
  }

})();
