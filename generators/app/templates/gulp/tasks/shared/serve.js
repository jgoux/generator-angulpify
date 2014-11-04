'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var config = require('../config').serve;

gulp.task('serve', function () {
  browserSync(config.browserSync);
});
