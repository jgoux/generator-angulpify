'use strict';

var gulp = require('gulp');<% if (includeCoffeeScript) { %>
var coffeelint = require('gulp-coffeelint');<% } else if (includeTypeScript) { %>
var tslint = require('gulp-tslint');<% } else { %>
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');<% } %>

module.exports = gulp.task('lint', function () {
  return gulp.src(config.paths.src.scripts)<% if (includeCoffeeScript) { %>
  .pipe(coffeelint())
  .pipe(coffeelint.reporter())<% } else if (includeTypeScript) { %>
  .pipe(tslint())
  .pipe(tslint.report('verbose')<% } else { %>
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))<% } %>;
});
