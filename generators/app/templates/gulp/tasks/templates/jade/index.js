'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');

var config = require('../config').index;

gulp.task('index', function () {
  return gulp.src(config.src)
    .pipe(plumber(function(error){
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(inject(gulp.src(config.injectSrc, {read: false}), config.inject))
    .pipe(jade(config.jade))
    .pipe(gulp.dest(config.dest));
});
