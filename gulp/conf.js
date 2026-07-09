/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'release',
  devDist: 'dev-release',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 *  Vendor libraries are now sourced from npm (node_modules) instead of Bower.
 *
 *  These two ordered lists replace the former wiredep/`bower.json` injection.
 *  They reproduce the exact set and load order of the vendor JS/CSS that
 *  wiredep used to inject (including the `overrides` main-file selections that
 *  lived in bower.json), now resolved from `node_modules`.
 *
 *  `vendorDirectory` is the root that gets served (browser-sync route) and used
 *  as the base for the injected `../node_modules/...` paths.
 */
exports.vendorDirectory = 'node_modules';

exports.vendor = {
  css: [
    'node_modules/ionicons/css/ionicons.css',
    'node_modules/angular-toastr/dist/angular-toastr.css',
    'node_modules/animate.css/animate.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
    'node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/fullcalendar/dist/fullcalendar.css',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.css',
    'node_modules/chartist/dist/chartist.min.css',
    'node_modules/morris.js/morris.css',
    'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
    'node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css',
    'node_modules/textangular/dist/textAngular.css',
    'node_modules/angular-xeditable/dist/css/xeditable.css',
    'node_modules/jstree/dist/themes/default/style.css',
    'node_modules/ui-select/dist/select.css'
  ],
  js: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-ui-dist/jquery-ui.js',
    'node_modules/jquery.easing/jquery.easing.1.3.js',
    'node_modules/easy-pie-chart/dist/jquery.easypiechart.js',
    'node_modules/chart.js/dist/Chart.js',
    'node_modules/amcharts3/amcharts/amcharts.js',
    'node_modules/amcharts3/amcharts/plugins/responsive/responsive.min.js',
    'node_modules/amcharts3/amcharts/serial.js',
    'node_modules/amcharts3/amcharts/funnel.js',
    'node_modules/amcharts3/amcharts/pie.js',
    'node_modules/amcharts3/amcharts/gantt.js',
    'node_modules/ammap3/ammap/ammap.js',
    'node_modules/ammap3/ammap/maps/js/worldLow.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/jquery-slimscroll/jquery.slimscroll.js',
    'node_modules/angular-jquery-slimscroll/angular-slimscroll.js',
    'node_modules/angular-smart-table/dist/smart-table.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
    'node_modules/angular-touch/angular-touch.js',
    'node_modules/angular-ui-sortable/dist/sortable.js',
    'node_modules/bootstrap/js/dropdown.js',
    'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
    'node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
    'node_modules/moment/moment.js',
    'node_modules/fullcalendar/dist/fullcalendar.js',
    'node_modules/leaflet/dist/leaflet-src.js',
    'node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/angular-chart.js/dist/angular-chart.js',
    'node_modules/chartist/dist/chartist.min.js',
    'node_modules/angular-chartist.js/dist/angular-chartist.js',
    'node_modules/eve-raphael/eve.js',
    'node_modules/raphael/raphael.js',
    'node_modules/mocha/mocha.js',
    'node_modules/morris.js/morris.js',
    'node_modules/angular-morris-chart/src/angular-morris-chart.min.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/rangy/lib/rangy-core.js',
    'node_modules/rangy/lib/rangy-classapplier.js',
    'node_modules/rangy/lib/rangy-highlighter.js',
    'node_modules/rangy/lib/rangy-selectionsaverestore.js',
    'node_modules/rangy/lib/rangy-serializer.js',
    'node_modules/rangy/lib/rangy-textrange.js',
    'node_modules/textangular/dist/textAngular.js',
    'node_modules/textangular/dist/textAngular-sanitize.js',
    'node_modules/textangular/dist/textAngularSetup.js',
    'node_modules/angular-xeditable/dist/js/xeditable.js',
    'node_modules/jstree/dist/jstree.js',
    'node_modules/ng-js-tree/dist/ngJsTree.js',
    'node_modules/ui-select/dist/select.js'
  ]
};

/**
 *  Fonts that used to be collected via `main-bower-files` (per bower.json
 *  `overrides`): Ionicons, Bootstrap glyphicons and Font Awesome webfonts.
 */
exports.vendorFonts = [
  'node_modules/ionicons/fonts/*.{eot,svg,ttf,woff,woff2}',
  'node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}',
  'node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
];

/**
 *  Vendor images that used to be copied from bower_components.
 */
exports.vendorImages = [
  'node_modules/ammap3/ammap/images/**/*',
  'node_modules/amcharts3/amcharts/images/**/*',
  'node_modules/ion-rangeslider/img/**/*',
  'node_modules/jstree/dist/themes/**/*',
  'node_modules/leaflet/dist/images/**/*'
];

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
