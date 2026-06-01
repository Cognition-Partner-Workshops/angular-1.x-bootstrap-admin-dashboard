'use strict';
var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

gulp.task('react', function () {
  return gulp.src('src/app/pages/dashboard/react/index.jsx')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('src/app/pages/dashboard/react/'));
});
