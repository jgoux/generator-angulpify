'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');

var config = require('../config').assets;

gulp.task('assets', function () {
  var imagesFilter = filter(config.imagesFilter);

  return gulp.src(config.src)
    .pipe(imagesFilter)
    .pipe(imagemin(config.imagemin))
    .pipe(imagesFilter.restore())
    .pipe(gulp.dest(config.dest));
});
