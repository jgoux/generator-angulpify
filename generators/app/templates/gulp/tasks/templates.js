'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var header = require('gulp-header');<% if (includeJade) { %>
var jade = require('gulp-jade');<% } else { %>
var minifyHTML = require('gulp-minify-html');<% } %>
<% if (includeJade) { %>
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}<% } %>

module.exports = gulp.task('templates', function () {
  return gulp.src(config.paths.src.templates)<% if (includeJade) { %>
    .pipe(gulpif(release, jade(), jade({ pretty: true }).on('error', handleError)))<% } else { %>
    .pipe(gulpif(release, minifyHTML({empty: true, spare: true, quotes: true})))<% } %>
    .pipe(templateCache({ standalone: true }))
    .pipe(header('module.exports = '))
    .pipe(gulp.dest(config.paths.src.templatesCompiled));
});
