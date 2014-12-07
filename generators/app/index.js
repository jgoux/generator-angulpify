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
        type: 'list', name: 'scripts', message: 'Would you like to use a language other than JavaScript?',
        choices: [
          {name: 'Nop, JavaScript please.', value: {name: 'js', extensions: '.js'}}
        ],
        default: 0
      },
      {
        type: 'list', name: 'styles', message: 'Would you like to use a preprocessor?',
        choices: [
          {name: 'Less', value: {name: 'less', extensions: '.less'}},
          {name: 'Sass', value: {name: 'sass', extensions: '.scss'}},
          {name: 'Nop, CSS please.', value: {name: 'css', extensions: '.css'}},
        ],
        default: 2
      },
      {
        type: 'list', name: 'templates', message: 'Would you like to use a template engine?',
        choices: [
          {name: 'Jade', value: {name: 'jade', extensions: '.jade'}},
          {name: 'Nop. HTML please.', value: {name: 'html', extensions: '.html'}}
        ],
        default: 1
      }
    ];

    this.prompt(prompts, function (answers) {
      this.project = answers.project.trim().replace(/\s+/g, '-').toLowerCase();
      this.scripts = answers.scripts;
      this.styles = answers.styles;
      this.templates = answers.templates;
      done();
    }.bind(this));
  },
  configuring: function () {
    // Scripts
    this.isJs = function () { return this.scripts.name === 'js'; };
    // Styles
    this.isCss = function () { return this.styles.name === 'css'; };
    this.isSass = function () { return this.styles.name === 'sass'; };
    this.isLess = function () { return this.styles.name === 'less'; };
    // Templates
    this.isHtml = function () { return this.templates.name === 'html'; };
    this.isJade = function () { return this.templates.name === 'jade'; };

    this.config.set({
      project: this.project,
      scripts: this.scripts,
      styles: this.styles,
      templates: this.templates
    });
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  },
  writing: {
    writeGulp: function () {
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.directory('gulp/tasks/shared', 'gulp/tasks');
      this.directory(path.join('gulp/tasks/scripts', this.scripts.name), 'gulp/tasks');
      this.directory(path.join('gulp/tasks/styles', this.styles.name), 'gulp/tasks');
      this.directory(path.join('gulp/tasks/templates', this.templates.name), 'gulp/tasks');
      this.copy('gulp/config.js', 'gulp/config.js');
      this.copy('gulp/utilities.js', 'gulp/utilities.js');
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
      copyFromGlob(this, 'src/**/*'+this.scripts.extensions);
    },
    writeStyles: function () {
      copyFromGlob(this, 'src/**/*'+this.styles.extensions);
    },
    writeTemplates: function () {
      copyFromGlob(this, 'src/**/*'+this.templates.extensions);
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
