'use strict';

var gulp = require('gulp');
var path = require('path');
var jade = require('gulp-jade');
var templateCache = require('gulp-angular-templatecache');

var config = require('../config').templates;

gulp.task('templates', function () {
  return gulp.src(config.src)
    .pipe(jade(config.jade))
    .pipe(templateCache(config.templateCache.filename, config.templateCache.options))
    .pipe(gulp.dest(config.dest));
});
