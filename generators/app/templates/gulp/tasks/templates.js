'use strict';

var gulp = require('gulp')<% if (includeJade) { %>,
  jade = require('gulp-jade')<% } %>,
  gulpif = require('gulp-if'),
  templateCache = require('gulp-angular-templatecache'),
  header = require('gulp-header');
<% if (includeJade) { %>
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}<% } %>
module.exports = gulp.task('templates', function () {
  return gulp.src(config.paths.src.templates)<% if (includeJade) { %>
    .pipe(gulpif(release, jade(), jade({ pretty: true }).on('error', handleError)))<% } %>
    .pipe(templateCache({ standalone: true }))
    .pipe(header('module.exports = '))
    .pipe(gulp.dest(config.paths.src.templatesCompiled));
});
