'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var env = require('../utilities').env;
var cssimport = require("gulp-cssimport");
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var config = require('../config').styles;

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(cssimport())
    .pipe(rename({basename: config.basename}))
    .pipe(gulpif(env.isProd(), rev()))
    .pipe(rename({suffix: '.min'}))
    //.pipe(gulpif(env.isDev(), sourcemaps.init()))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(csso())
    //.pipe(gulpif(env.isDev(), sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest));
});
