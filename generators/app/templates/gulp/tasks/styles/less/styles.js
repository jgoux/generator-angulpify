'use strict';

var gulp = require('gulp');
var env = require('../env');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var csso = require('gulp-csso');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var config = require('../config').styles;

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(rename(config.rename))
    .pipe(rename({suffix: '.min'}))
    //.pipe(gulpif(env.isProd(), sourcemaps.init()))
    .pipe(less(config.less))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(csso())
    //.pipe(gulpif(env.isProd(), sourcemaps.write('./')))
    .pipe(gulpif(env.isProd(), rev()))
    .pipe(gulp.dest(config.dest));
});
