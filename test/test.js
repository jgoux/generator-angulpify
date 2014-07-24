/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('angulpify generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.angulpify = helpers.createGenerator('angulpify:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.angulpify.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      'bower.json',
      'package.json',
      'gulpfile.js'
    ];

    helpers.mockPrompt(this.angulpify, {
      projectName: 'foo bar',
      features: ['includeUIRouter']
    });

    this.angulpify.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
