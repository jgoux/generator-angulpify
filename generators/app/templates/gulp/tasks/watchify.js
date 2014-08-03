'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');<% if (includeCoffeeScript) { %>
var coffeeify = require('coffeeify');<% } else if (includeTypeScript) { %>
var typescriptifier = require('typescriptifier');<% } %>

module.exports = gulp.task('watchify', function () {
  var bundler = watchify({
    entries: [config.paths.src.modules]<% if (includeCoffeeScript) { %>,
    extensions: ['.coffee']<% } else if (includeTypeScript) { %>,
    extensions: ['.ts']<% } %>
  });

  <% if (includeCoffeeScript) { %>
  bundler.transform(coffeeify);<% } else if (includeTypeScript) { %>
  bundler.transform(typescriptifier);<% } %>
  bundler.transform(browserifyShim);

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle({ debug: true })
      .pipe(source(config.filenames.build.scripts))
      .pipe(gulp.dest(config.paths.dest.build.scripts));
  }

  return rebundle();
});
