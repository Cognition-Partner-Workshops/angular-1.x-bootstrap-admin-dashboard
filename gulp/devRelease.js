'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('dev-fonts', function () {
  return gulp.src(conf.vendorFonts)
      .pipe($.flatten())
      .pipe(gulp.dest(path.join(conf.paths.devDist, 'fonts')));
});

gulp.task('dev-copy-lib', function () {
  var srcList = [];
  srcList.push.apply(srcList, conf.vendor.js);
  srcList.push.apply(srcList, conf.vendor.css);
  return gulp
      .src(srcList)
      .pipe($.flatten())
      .pipe(gulp.dest(path.join(conf.paths.devDist, 'lib')));
});

gulp.task('dev-css-replace', ['dev-copy-assets'], function() {
  return gulp.src(path.join(conf.paths.devDist, '*.html'))
      .pipe($.replace(/<link rel="stylesheet" href="\.\.\/node_modules\/.*\/(.*)"\s*?\/>/g, '<link rel="stylesheet" href="lib/$1" >'))
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-js-replace', ['dev-copy-assets'], function() {
  return gulp.src(path.join(conf.paths.devDist, '*.html'))
      .pipe($.replace(/<script src="\.\.\/node_modules\/.*\/(.*)"\s*?>/g, '<script src="lib/$1">'))
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-copy-assets', ['inject', 'dev-copy-lib', 'dev-fonts'], function () {
  return gulp
      .src([
        conf.paths.src + '/**/*',
        path.join(conf.paths.tmp, '/serve/**/*')
      ])
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-release', ['dev-css-replace', 'dev-js-replace']);
