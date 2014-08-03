/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('angulpify: sass feature', function () {

  var mockPrompts = {
    projectName: 'angulpify',
    language: 'includeJavaScript',
    preprocessor: 'includeSass',
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
      'src/styles/app.scss',
      'src/styles/_imports.scss',
      'src/styles/_variables.scss',
    ];
    this.angulpify.run({}, function () {
      assert.file(expected);
      assert.fileContent('src/styles/_imports.scss', /You can @import all your bower_components \.sass files here/);
      assert.fileContent('src/styles/_variables.scss', /You can add\/overwrite all your bower_components \.sass variables here/);
      done();
    });
  });

  /*it('creates expected files with Bootstrap', function (done) {
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
  });*/
});
