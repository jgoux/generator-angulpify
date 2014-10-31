'use strict';

var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var globby = require('globby');
var yeoman = require('yeoman-generator');

function copyFromGlob(generator, paths) {
  var sourceRoot = generator.sourceRoot();
  paths = typeof paths === 'string' ? [paths] : paths;
  paths = paths.map(function(_path) {
    return path.join(sourceRoot, _path);
  });
  globby.sync(paths).forEach(function(filename) {
    filename = filename.replace(sourceRoot+'/', '');
    generator.copy(filename, filename);
  });
}

var AngulpifyGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install', {desc: 'Skip the bower and node installations'});
  },
  initializing: function () {},
  prompting: function () {
    var done = this.async();
    var welcomeMessage = 'Out of the box I include '+ chalk.red('AngularJS')+', '+chalk.red('Gulp')+' and '+chalk.red('Browserify')+' to build your app.';
    this.log(yosay(welcomeMessage));
    var prompts = [
      {
        type: 'input', name: 'project', message: 'What\'s your project name?',
        default: this.appname
      },
      {
        type: 'list', name: 'script', message: 'Would you like to use a language other than JavaScript?',
        choices: [
          {name: 'JavaScript is all I need', value: 'js'}
        ],
        default: 0
      },
      {
        type: 'list', name: 'style', message: 'Would you like to use a preprocessor?',
        choices: [
          {name: 'Sass', value: 'scss'}
        ],
        default: 0
      },
      {
        type: 'list', name: 'template', message: 'Would you like to use a template engine?',
        choices: [
          {name: 'Jade', value: 'jade'}
        ],
        default: 0
      }
    ];

    this.prompt(prompts, function (answers) {
      this.project = answers.project;
      this.script = answers.script;
      this.style = answers.style;
      this.template = answers.template;
      done();
    }.bind(this));
  },
  configuring: function () {
    this.config.set({
      project: this.project,
      script: this.script,
      style: this.style,
      template: this.template
    });
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  },
  writing: {
    writeGulp: function () {
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.directory('gulp', 'gulp');
    },
    writeBower: function () {
      this.copy('_bower.json', 'bower.json');
    },
    writePackage: function () {
      this.copy('_package.json', 'package.json');
    },
    writeAssets: function () {
      this.directory('src/assets', 'src/assets');
    },
    writeConfigs: function () {
      copyFromGlob(this, 'src/**/*.config.json');
    },
    writeScripts: function () {
      copyFromGlob(this, 'src/**/*.'+this.script);
    },
    writeStyles: function () {
      copyFromGlob(this, 'src/**/*.'+this.style);
    },
    writeTemplates: function () {
      copyFromGlob(this, 'src/**/*.'+this.template);
    }
  },
  install: function () {
    if (this.options['skip-install']) {
      this.log('To finish the installation, run `'+chalk.blue('bower install && npm install')+'`');
    } else {
      this.installDependencies();
    }
  },
  end: function () {}
});
