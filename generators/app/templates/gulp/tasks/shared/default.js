'use strict';

var gulp = require('gulp');
var env = require('../utilities').env;
var runSequence = require('run-sequence');

gulp.task('default', function () {
  if (env.isDev()) {
    runSequence(
      ['clean'],
      ['assets', 'config', 'lint', 'styles', 'templates'],
      ['browserify:app', 'browserify:vendors'],
      ['index'],
      ['watch'],
      ['serve']
    );
  } else if (env.isProd()) {
    runSequence(
      ['clean'],
      ['assets', 'config', 'lint', 'styles', 'templates'],
      ['browserify:app', 'browserify:vendors'],
      ['index']
    );
  }
});
