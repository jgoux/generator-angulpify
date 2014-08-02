/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify:app', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
      if (err) {
        return done(err);
      }
      this.angulpify = helpers.createGenerator('angulpify:app', ['../../generators/app']);
      this.angulpify.options['skip-install'] = true;
      this.angulpify.options['skip-welcome-message'] = true;
      done();
    }.bind(this));
  });

  it('can be imported without blowing up', function () {
    this.app = require('../generators/app');
    assert(this.app !== undefined);
  });

  it('creates expected config files', function (done) {
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      '.yo-rc.json'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected Gulp files', function (done) {
    var expected = [
      'gulpfile.js',
      'gulp/config.js',
      'gulp/index.js',
      'gulp/tasks/assets.js',
      'gulp/tasks/browserify.js',
      'gulp/tasks/clean.js',
      'gulp/tasks/default.js',
      'gulp/tasks/images.js',
      'gulp/tasks/index.js',
      'gulp/tasks/lint.js',
      'gulp/tasks/minify.js',
      'gulp/tasks/serve.js',
      'gulp/tasks/styles.js',
      'gulp/tasks/templates.js',
      'gulp/tasks/watch.js',
      'gulp/tasks/watchify.js'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with CoffeeScript enabled', function (done) {
    var expected = [
      'src/modules/index.coffee',
      'src/modules/app/foo/fooController.coffee',
      'src/modules/app/foo/index.coffee',
      'src/modules/app/index.coffee',
      'src/modules/common/directives/fooDirective.coffee',
      'src/modules/common/directives/index.coffee',
      'src/modules/common/filters/fooFilter.coffee',
      'src/modules/common/filters/index.coffee',
      'src/modules/common/services/fooService.coffee',
      'src/modules/common/services/index.coffee',
      'src/modules/common/index.coffee'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeCoffeeScript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with CoffeeScript disabled', function (done) {
    var expected = [
      'src/modules/index.js',
      'src/modules/app/foo/fooController.js',
      'src/modules/app/foo/index.js',
      'src/modules/app/index.js',
      'src/modules/common/directives/fooDirective.js',
      'src/modules/common/directives/index.js',
      'src/modules/common/filters/fooFilter.js',
      'src/modules/common/filters/index.js',
      'src/modules/common/services/fooService.js',
      'src/modules/common/services/index.js',
      'src/modules/common/index.js'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with Jade enabled', function (done) {
    var expected = [
      'src/index.jade',
      'src/modules/app/foo/layout.jade'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeJade',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with Jade disabled', function (done) {
    var expected = [
      'src/index.html',
      'src/modules/app/foo/layout.html'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with Sass enabled', function (done) {
    var expected = [
      'src/styles/app.scss',
      'src/styles/_imports.scss',
      'src/styles/_variables.scss',
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeSass',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      assert.fileContent('src/styles/_imports.scss', /You can @import all your bower_components \.sass files here/);
      assert.fileContent('src/styles/_variables.scss', /You can add\/overwrite all your bower_components \.sass variables here/);
      done();
    });
  });

  it('creates expected files with Sass disabled', function (done) {
    var expected = [
      'src/styles/app.css'
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeCss',
      templateEngine: 'includeHtml',
      goodies: []
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected files with Bootstrap included and Sass enabled', function (done) {
    var expected = [
      'src/styles/app.scss',
      'src/styles/_imports.scss',
      'src/styles/_variables.scss',
    ];
    helpers.mockPrompt(this.angulpify, {
      projectName: 'angulpify',
      language: 'includeJavascript',
      preprocessor: 'includeSass',
      templateEngine: 'includeHtml',
      goodies: ['includeBootstrap']
    });
    this.angulpify.run({}, function () {
      assert.file(expected);
      assert.fileContent('src/styles/_imports.scss', /Bootstrap-sass-official \(you can comment unused files\)/);
      assert.fileContent('src/styles/_variables.scss', /Bootstrap-sass-official/);
      done();
    });
  });

});
