'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

var config = require('../config').watch;

gulp.task('watch', function () {
  watch(config.lint, function(files, cb) {
    gulp.start('lint', cb);
  });

  watch(config.index, function(files, cb) {
    gulp.start('index', cb);
  });

  watch(config.templates, function(files, cb) {
    gulp.start('templates', cb);
  });

  watch(config.config, function(files, cb) {
    gulp.start('config', cb);
  });

  watch(config.styles, function(files, cb) {
    gulp.start('styles', function() {
      browserSync.reload(config.styles_output);
      cb();
    });
  });

  watch(config.reload, function(files, cb) {
    browserSync.reload();
    cb();
  });
});
