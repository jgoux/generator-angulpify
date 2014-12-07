'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

var config = require('../config').watch;

gulp.task('watch', function () {
  watch(config.lint, function() {
    gulp.start('lint');
  });

  watch(config.index, function() {
    gulp.start('index');
  });

  watch(config.templates, function() {
    gulp.start('templates');
  });

  watch(config.config, function() {
    gulp.start('config');
  });

  watch(config.styles, function() {
    gulp.start('styles', function() {
      browserSync.reload(config.styles_output);
    });
  });

  watch(config.reload, function() {
    browserSync.reload();
  });
});
