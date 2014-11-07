'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var env = require('../utilities').env;
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var prettyHrtime = require('pretty-hrtime');
var ngAnnotate = require('gulp-ng-annotate');

var config = require('../config').browserify.app;

gulp.task('browserify:app', function () {
  var bundler = browserify(config.browserify);

  if (env.isDev()) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle () {
    gutil.log('Bundling ' + gutil.colors.magenta(config.output) + '...');
    var start = process.hrtime();
    return bundler
      .bundle()
      .pipe(source(config.output))
      .pipe(buffer())
      .pipe(gulpif(env.isDev(), rename({suffix: '.min'})))
      .pipe(gulpif(env.isDev(), sourcemaps.init({loadMaps: true})))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulpif(env.isDev(), sourcemaps.write('./')))
      .pipe(gulpif(env.isProd(), rev()))
      .pipe(gulpif(env.isProd(), rename({suffix: '.min'})))
      .pipe(gulp.dest(config.dest))
      .on('end', function () {
        var end = process.hrtime(start);
        var prettyTime = prettyHrtime(end);
        gutil.log('Bundled ' + gutil.colors.magenta(config.output) + ' after ' + gutil.colors.magenta(prettyTime));
      });
  }

  return bundle();
});







