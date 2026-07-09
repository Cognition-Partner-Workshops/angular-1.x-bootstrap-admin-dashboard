'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

// Copies vendor images (ammap, amcharts, ion-rangeslider, jstree, leaflet) from
// node_modules into the served assets dir. The npm packages use slightly
// different internal layouts than the old bower packages, so the paths are
// remapped to the legacy `assets/img/theme/vendor/...` structure the app's
// LayoutPaths constants (and sass) still reference, preserving runtime behavior.
gulp.task('copyVendorImages', function () {
  return gulp
    .src(conf.vendorImages, {base: conf.vendorDirectory})
    .pipe($.rename(function (p) {
      p.dirname = p.dirname
        .replace(/^ammap3[\/\\]ammap/, 'ammap/dist/ammap')
        .replace(/^amcharts3[\/\\]amcharts/, 'amcharts/dist/amcharts')
        .replace(/^ion-rangeslider/, 'ionrangeslider');
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve', '/assets/img/theme/vendor')));
});
