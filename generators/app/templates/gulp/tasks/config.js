'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var ngConstant = require('gulp-ng-constant');

var config = require('../config').config;

gulp.task('config', function () {
  return gulp.src(config.src)
    .pipe(rename(config.rename))
    .pipe(ngConstant(config.ngConstant))
    .pipe(gulp.dest(config.dest));
});
