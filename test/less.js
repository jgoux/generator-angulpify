/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify: less feature', function () {
  var mockPrompts = {
    projectName: 'angulpify',
    language: 'includeJavaScript',
    preprocessor: 'includeLess',
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
      'src/styles/app.less',
      'src/styles/imports.less',
      'src/styles/variables.less',
    ];
    this.angulpify.run({}, function () {
      assert.file(expected);
      assert.fileContent('src/styles/imports.less', /You can @import all your bower_components \.less files here/);
      assert.fileContent('src/styles/variables.less', /You can add\/overwrite all your bower_components \.less variables here/);
      done();
    });
  });
});
