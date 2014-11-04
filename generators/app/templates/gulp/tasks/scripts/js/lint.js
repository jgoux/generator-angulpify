'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var config = require('../config').lint;

gulp.task('lint', function () {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
