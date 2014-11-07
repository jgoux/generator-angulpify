'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var csso = require('gulp-csso');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var env = require('../utilities').env;
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var config = require('../config').styles;

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(plumber(function(error){
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(rename({basename: config.basename}))
    .pipe(gulpif(env.isProd(), rev()))
    .pipe(rename({suffix: '.min'}))
    //.pipe(gulpif(env.isDev(), sourcemaps.init()))
    .pipe(sass(config.sass))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(csso())
    //.pipe(gulpif(env.isDev(), sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest));
});
