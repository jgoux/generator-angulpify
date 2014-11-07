'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');

var config = require('../config').templates;

gulp.task('templates', function () {
  return gulp.src(config.src)
    .pipe(plumber(function(error){
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(jade(config.jade))
    .pipe(templateCache(config.templateCache.filename, config.templateCache.options))
    .pipe(gulp.dest(config.dest));
});
