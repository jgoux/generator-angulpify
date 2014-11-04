'use strict';

var gulp = require('gulp');
var path = require('path');
var minifyHTML = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');

var config = require('../config').templates;

gulp.task('templates', function () {
  return gulp.src(config.src)
    .pipe(minifyHTML(config.minifyHTML))
    .pipe(templateCache(config.templateCache.filename, config.templateCache.options))
    .pipe(gulp.dest(config.dest));
});
