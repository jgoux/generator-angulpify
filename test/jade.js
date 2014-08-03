/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify: jade feature', function () {

  var mockPrompts = {
    projectName: 'angulpify',
    language: 'includeJavaScript',
    preprocessor: 'includeCss',
    templateEngine: 'includeJade',
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

  it('creates expected files', function (done) {
    var expected = [
      'src/index.jade',
      'src/modules/app/foo/layout.jade'
    ];
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });
});
