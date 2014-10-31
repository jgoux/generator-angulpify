'use strict';

var del = require('del');
var gulp = require('gulp');

var config = require('../config').clean;

gulp.task('clean', function (cb) {
  del(config.src, cb);
});
