/**
 * AngularJS → React bridges for the migrated Maps module.
 *
 * Each directive mounts a React component (from the BlurAdminReact bundle)
 * into its host element. Theme colors (baConfig) and asset paths (layoutPaths)
 * are injected from AngularJS and passed as props — never read from window.
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
      setTimeout(function () {
        if (root) {
          root.unmount();
        }
      }, 0);
    });
  }

  function googleMapsReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('GoogleMapsPage', element, {});
        unmountOnDestroy(scope, root);
      }
    };
  }

  function leafletReact() {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('LeafletPage', element, {});
        unmountOnDestroy(scope, root);
      }
    };
  }

  /** @ngInject */
  function mapBubblesReact(baConfig, layoutPaths) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('MapBubblesPage', element, {
          baConfig: baConfig,
          layoutPaths: layoutPaths
        });
        unmountOnDestroy(scope, root);
      }
    };
  }

  /** @ngInject */
  function mapLinesReact(baConfig, layoutPaths) {
    return {
      restrict: 'E',
      link: function (scope, element) {
        var root = mount('MapLinesPage', element, {
          baConfig: baConfig,
          layoutPaths: layoutPaths
        });
        unmountOnDestroy(scope, root);
      }
    };
  }

})();
