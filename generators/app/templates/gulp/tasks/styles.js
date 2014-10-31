'use strict';

var gulp = require('gulp');
var env = require('../env');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var csso = require('gulp-csso');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

var config = require('../config').styles;

gulp.task('styles', function () {
  var cssFilter = filter(config.cssFilter);

  return gulp.src(config.src)
    .pipe(sass(config.sass))
    .pipe(cssFilter)
    .pipe(autoprefixer('last 1 version'))
    .pipe(csso())
    .pipe(cssFilter.restore())
    .pipe(rename(config.rename))
    .pipe(gulpif(env.isProd(), rev()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest));
});
