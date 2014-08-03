/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify: default features (javascript/css/html)', function () {

  var mockPrompts = {
    projectName: 'angulpify',
    language: 'includeJavaScript',
    preprocessor: 'includeCss',
    templateEngine: 'includeHtml',
    goodies: []
  };

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
      if (err) {
        return done(err);
      }
      this.angulpify = helpers.createGenerator('angulpify:app', ['../../generators/app']);
      this.angulpify.options['skip-install'] = true;
      this.angulpify.options['skip-welcome-message'] = true;

      helpers.mockPrompt(this.angulpify, mockPrompts);

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
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected gulp files', function (done) {
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
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected script files', function (done) {
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
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected style files', function (done) {
    var expected = [
      'src/styles/app.css'
    ];
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

  it('creates expected template files', function (done) {
    var expected = [
      'src/index.html',
      'src/modules/app/foo/layout.html'
    ];
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

});
