'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

// Options that turn each node_modules-relative vendor path into the
// `../node_modules/...` form the app expects (the browser normalises the
// leading `..` to the served `/node_modules` route). This replaces the former
// wiredep injection now that dependencies come from npm instead of Bower.
var vendorInjectOptions = {
  starttag: '<!-- vendor:{{ext}} -->',
  endtag: '<!-- endvendor -->',
  addPrefix: '..',
  addRootSlash: false,
  relative: false
};

function injectVendorJs(stream) {
  return stream.pipe($.inject(
    gulp.src(conf.vendor.js, {read: false, base: '.'}),
    vendorInjectOptions
  ));
}

function injectVendorCss(stream) {
  return stream.pipe($.inject(
    gulp.src(conf.vendor.css, {read: false, base: '.'}),
    vendorInjectOptions
  ));
}

gulp.task('inject-reload', ['inject'], function () {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles', 'injectAuth', 'inject404', 'copyVendorImages'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/main.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {read: false});

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/assets/js/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
    /*.pipe($.angularFilesort())*/.on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var stream = gulp.src(path.join(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions));

  stream = injectVendorCss(stream);
  stream = injectVendorJs(stream);

  return stream.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

gulp.task('injectAuth', ['stylesAuth'], function () {
  return injectAlone({
    css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/auth.css')],
    paths: [path.join(conf.paths.src, '/auth.html'), path.join(conf.paths.src, '/reg.html')]
  })
});

gulp.task('inject404', ['styles404'], function () {
  return injectAlone({
    css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/404.css')],
    paths: path.join(conf.paths.src, '/404.html')
  })
});

var injectAlone = function (options) {
  var injectStyles = gulp.src(
    options.css
    , {read: false});

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var stream = gulp.src(options.paths)
    .pipe($.inject(injectStyles, injectOptions));

  stream = injectVendorCss(stream);
  stream = injectVendorJs(stream);

  return stream.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
};
