'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AngulpifyGenerator = module.exports = function AngulpifyGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, gulpfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;
};

util.inherits(AngulpifyGenerator, yeoman.generators.Base);

AngulpifyGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
    this.log(chalk.magenta('Out of the box I include AngularJS, Gulp tasks and Browserify to build your app.'));
  }

  var prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: 'What\'s your project name?',
      default: this.appname
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [
        {
          name: 'Bootstrap',
          value: 'includeBootstrap',
          checked: true
        },
        {
          name: 'UI Bootstrap',
          value: 'includeUIBootstrap',
          checked: true
        },
        {
          name: 'UI Router',
          value: 'includeUIRouter',
          checked: true
        }
      ]
    }
  ];

  this.prompt(prompts, function (answers) {
    var features = answers.features;
    var hasFeature = function (feat) {
      return features.indexOf(feat) !== -1;
    };

    this.appname = this._.slugify(answers.projectName);
    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeUIBootstrap = hasFeature('includeUIBootstrap');
    this.includeUIRouter = hasFeature('includeUIRouter');

    cb();
  }.bind(this));
};

AngulpifyGenerator.prototype.gulp = function () {
  this.copy('gulpfile.js');
  this.directory('gulp');
};

AngulpifyGenerator.prototype.packageJSON = function () {
  this.template('_package.json', 'package.json');
};

AngulpifyGenerator.prototype.git = function () {
  this.copy('gitignore', '.gitignore');
};

AngulpifyGenerator.prototype.bower = function () {
  var bower = {
    name: this.appname,
    private: true,
    dependencies: {
      angular: '~1.2.20'
    }
  };

  if (this.includeUIBootstrap) bower.dependencies['bootstrap-sass-official'] = '~3.2.0';
  if (this.includeUIBootstrap) bower.dependencies['angular-bootstrap'] = '~0.11.0';
  if (this.includeUIRouter)
    bower.dependencies['angular-ui-router'] = '~0.2.10';
  else
    bower.dependencies['angular-route'] = '~1.2.20';

  this.write('bower.json', JSON.stringify(bower, null, 2));
};

AngulpifyGenerator.prototype.jshint = function () {
  this.copy('jshintrc', '.jshintrc');
};

AngulpifyGenerator.prototype.editorConfig = function () {
  this.copy('editorconfig', '.editorconfig');
};

AngulpifyGenerator.prototype.app = function () {
  this.directory('src');
  this.mkdir('src/assets');
  this.mkdir('src/assets/fonts');
  this.mkdir('src/assets/images');
  this.mkdir('src/styles');
};

AngulpifyGenerator.prototype.styles = function () {
  if (this.includeBootstrap) {
    this.copy('_imports.scss', 'src/styles/_imports.scss');
    this.copy('_variables.scss', 'src/styles/_variables.scss');
  }
};

AngulpifyGenerator.prototype.install = function () {
  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: function () {
      done();
    }.bind(this)
  });
};
