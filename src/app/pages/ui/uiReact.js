(function () {
  'use strict';

  var componentMap = {
    'typographyReact': 'TypographyPage',
    'buttonsReact': 'ButtonsPage',
    'iconsReact': 'IconsPage',
    'modalsReact': 'ModalsPage',
    'gridReact': 'GridPage',
    'alertsReact': 'AlertsPage',
    'progressBarsReact': 'ProgressBarsPage',
    'notificationsReact': 'NotificationsPage',
    'tabsReact': 'TabsPage',
    'sliderReact': 'SliderPage',
    'panelsReact': 'PanelsPage'
  };

  function createBridgeDirective(directiveName, componentName) {
    angular.module('BlurAdmin.pages.ui')
      .directive(directiveName, function () {
        return {
          restrict: 'E',
          link: function (scope, element) {
            var lib = window.BlurAdminReact;
            if (!lib || !lib[componentName]) {
              element.html('<p class="text-danger">React bundle not loaded.</p>');
              return;
            }
            var root = lib.mountReactApp(lib[componentName], element[0], {});
            scope.$on('$destroy', function () {
              setTimeout(function () { root.unmount(); }, 0);
            });
          }
        };
      });
  }

  Object.keys(componentMap).forEach(function (directive) {
    createBridgeDirective(directive, componentMap[directive]);
  });
})();
