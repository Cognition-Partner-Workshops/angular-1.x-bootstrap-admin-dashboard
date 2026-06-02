/**
 * AngularJS → React bridge directives for the migrated UI module.
 *
 * Each sub-page state (ui.typography, ui.buttons, …) now renders one of these
 * element directives instead of an AngularJS templateUrl + controller. The
 * directive mounts the matching React component from the webpack-built
 * `window.BlurAdminReact` bundle via React 19's createRoot (mountReactApp).
 *
 * The angular-toastr `toastr` service, its `toastrConfig`, and `$rootScope`
 * are injected and forwarded as props so the React Notifications / Modals
 * components can drive real toasts (and trigger digests) — baConfig-style
 * service injection rather than reaching for window globals.
 */
(function () {
  'use strict';

  function bridgeFactory(componentName) {
    return ['toastr', 'toastrConfig', '$rootScope', function (toastr, toastrConfig, $rootScope) {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var lib = window.BlurAdminReact;
          if (!lib || !lib[componentName]) {
            element.html('<p class="text-danger">React bundle not loaded.</p>');
            return;
          }
          var root = lib.mountReactApp(lib[componentName], element[0], {
            toastr: toastr,
            toastrConfig: toastrConfig,
            $rootScope: $rootScope,
          });
          scope.$on('$destroy', function () {
            setTimeout(function () { root.unmount(); }, 0);
          });
        },
      };
    }];
  }

  var directives = [
    { module: 'BlurAdmin.pages.ui.typography', directive: 'typographyReact', component: 'TypographyPage' },
    { module: 'BlurAdmin.pages.ui.buttons', directive: 'buttonsReact', component: 'ButtonsPage' },
    { module: 'BlurAdmin.pages.ui.icons', directive: 'iconsReact', component: 'IconsPage' },
    { module: 'BlurAdmin.pages.ui.modals', directive: 'modalsReact', component: 'ModalsPage' },
    { module: 'BlurAdmin.pages.ui.grid', directive: 'gridReact', component: 'GridPage' },
    { module: 'BlurAdmin.pages.ui.alerts', directive: 'alertsReact', component: 'AlertsPage' },
    { module: 'BlurAdmin.pages.ui.progressBars', directive: 'progressBarsReact', component: 'ProgressBarsPage' },
    { module: 'BlurAdmin.pages.ui.notifications', directive: 'notificationsReact', component: 'NotificationsPage' },
    { module: 'BlurAdmin.pages.ui.tabs', directive: 'tabsReact', component: 'TabsPage' },
    { module: 'BlurAdmin.pages.ui.slider', directive: 'sliderReact', component: 'SliderPage' },
    { module: 'BlurAdmin.pages.ui.panels', directive: 'panelsReact', component: 'PanelsPage' },
  ];

  directives.forEach(function (d) {
    angular.module(d.module).directive(d.directive, bridgeFactory(d.component));
  });

})();
