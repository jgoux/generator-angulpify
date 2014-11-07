'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var watchify = require('watchify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var shim = require('browserify-shim');
var env = require('../utilities').env;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var prettyHrtime = require('pretty-hrtime');

var config = require('../config').browserify.vendors;

gulp.task('browserify:vendors', function () {

  var bundler = browserify(config.browserify);

  if (env.isDev()) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle () {
    gutil.log('Bundling '+gutil.colors.magenta(config.output)+'...');
    var start = process.hrtime();

    return bundler
      .transform(shim)
      .bundle()
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe(gulpif(env.isProd(), rev()))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.dest))
      .on('end', function () {
        var end = process.hrtime(start);
        var prettyTime = prettyHrtime(end);
        gutil.log('Bundled '+gutil.colors.magenta(config.output)+' after '+gutil.colors.magenta(prettyTime));
      });
  }

  return bundle();
});








