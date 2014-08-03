'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');<% if (includeCoffeeScript) { %>
var coffeeify = require('coffeeify');<% } else if (includeTypeScript) { %>
var typescriptifier = require('typescriptifier');<% } %>

module.exports = gulp.task('browserify', function () {
  return browserify({
      entries: [config.paths.src.modules]<% if (includeCoffeeScript) { %>,
      extensions: ['.coffee']<% } else if (includeTypeScript) { %>,
      extensions: ['.ts']<% } %>
    })<% if (includeCoffeeScript) { %>
    .transform(coffeeify)<% } else if (includeTypeScript) { %>
    .transform(typescriptifier)<% } %>
    .transform(browserifyShim)
    .bundle()
    .pipe(source(config.filenames.release.scripts))
    .pipe(gulp.dest(config.paths.dest.release.scripts));
});
