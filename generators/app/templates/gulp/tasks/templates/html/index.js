'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');

var config = require('../config').index;

gulp.task('index', function () {
  return gulp.src(config.src)
    .pipe(inject(gulp.src(config.injectSrc, {read: false}), config.inject))
    .pipe(minifyHTML(config.minifyHTML))
    .pipe(gulp.dest(config.dest));
});
