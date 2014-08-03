/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify: coffeescript feature', function () {

  var mockPrompts = {
    projectName: 'angulpify',
    language: 'includeCoffeeScript',
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

  it('creates expected files', function (done) {
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
    this.angulpify.run({}, function () {
      assert.file(expected);
      done();
    });
  });

});
