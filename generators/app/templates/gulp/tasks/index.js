'use strict';

var gulp = require('gulp')<% if (includeJade) { %>,
  jade = require('gulp-jade')<% } %>,
  gulpif = require('gulp-if'),
  replace = require('gulp-replace');

module.exports = gulp.task('index', function () {
  return gulp.src(config.paths.src.index)<% if (includeJade) { %>
    .pipe(gulpif(release, jade(), jade({pretty: true})))<% } %>
    .pipe(gulpif(release,
      replace('<!--styles-->', '<link href="' + config.filenames.release.styles + '" rel="stylesheet">'),
      replace('<!--styles-->', '<link href="' + config.filenames.build.styles + '" rel="stylesheet">')
    ))
    .pipe(gulpif(release,
      replace('<!--scripts-->', '<script src="' + config.filenames.release.scripts + '"></script>'),
      replace('<!--scripts-->', '<script src="' + config.filenames.build.scripts + '"></script>')
    ))
    .pipe(gulpif(release,
      gulp.dest(config.paths.dest.release.index),
      gulp.dest(config.paths.dest.build.index)));
});
