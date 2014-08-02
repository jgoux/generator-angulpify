'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AngulpifyGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-welcome-message', {desc: 'Skip the welcome message'});
    this.option('skip-install', {desc: 'Skip the bower and node installations'});
    this.option('skip-install-message', {desc: 'Skip the bower and node installations commands'});
  },
  initializing: function () {},
  prompting: function () {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      var welcomeMessage = 'Out of the box I include '+ chalk.red('AngularJS') + ', ' + chalk.red('Gulp') + ' and ' + chalk.red('Browserify') + ' to build your app.';
      this.log(yosay(welcomeMessage));
    }
    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s your project name?',
        default: this.appname
      },
      {
        type: 'list',
        name: 'languages',
        message: 'Would you like to use a language other than JavaScript?',
        choices: [
          {
            name: 'CoffeeScript',
            value: 'includeCoffeeScript'
          },
          {
            name: 'TypeScript',
            value: 'includeTypeScript'
          },
          {
            name: 'JavaScript is all I need',
            value: 'includeJavascript'
          }
        ],
        default: 2
      },
      {
        type: 'list',
        name: 'preprocessors',
        message: 'Would you like to use a preprocessor?',
        choices: [
          {
            name: 'Less',
            value: 'includeLess'
          },
          {
            name: 'Sass',
            value: 'includeSass'
          },
          {
            name: 'CSS is just fine',
            value: 'includeHtml'
          }
        ],
        default: 2
      },
      {
        type: 'list',
        name: 'templateEngines',
        message: 'Would you like to use a template engine?',
        choices: [
          {
            name: 'Jade',
            value: 'includeJade'
          },
          {
            name: 'HTML is enough',
            value: 'includeHtml'
          }
        ],
        default: 1
      },
      {
        type: 'checkbox',
        name: 'goodies',
        message: 'I promess it\'s the last one, what more would you like?',
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
      var features = [answers.languages].concat([answers.preprocessors], [answers.templateEngines], answers.goodies);
      var hasFeature = function (feature) {
        return features.indexOf(feature) !== -1;
      };

      this.appname = answers.projectName;

      this.includeCoffeeScript = hasFeature('includeCoffeeScript');
      this.includeTypeScript = hasFeature('includeTypeScript');
      this.includeJavascript = hasFeature('includeJavascript');

      this.includeLess = hasFeature('includeLess');
      this.includeSass = hasFeature('includeSass');
      this.includeCss = hasFeature('includeCss');

      this.includeJade = hasFeature('includeJade');
      this.includeHtml = hasFeature('includeHtml');

      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeUIBootstrap = hasFeature('includeUIBootstrap');
      this.includeUIRouter = hasFeature('includeUIRouter');

      done();
    }.bind(this));
  },
  configuring: function () {
    this.config.set({
      projectName: this.appname,
      coffee: this.includeCoffeeScript,
      jade: this.includeJade,
      sass: this.includeSass,
      bootstrap: this.includeBootstrap,
      uiBootstrap: this.includeUIBootstrap,
      uiRouter: this.includeUIRouter
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
      var bower = {
        name: this.appname,
        private: true,
        dependencies: {
          angular: '~1.2.21'
        }
      };
      if (this.includeBootstrap) bower.dependencies['bootstrap' + (this.includeSass ? '-sass-official' : '')] = '~3.2.0';
      if (this.includeUIBootstrap) bower.dependencies['angular-bootstrap'] = '~0.11.0';
      if (this.includeUIRouter) {
        bower.dependencies['angular-ui-router'] = '~0.2.10';
      } else {
        bower.dependencies['angular-route'] = '~1.2.21';
      }
      this.write('bower.json', JSON.stringify(bower, null, 2));
    },
    writePackage: function () {
      this.copy('_package.json', 'package.json');
    },
    writeAssets: function () {
      this.directory('src/assets', 'src/assets');
      this.mkdir('src/assets/fonts');
    },
    writeModules: function () {
      if (this.includeCoffeeScript) {
        this.directory('src/modules/coffeescript', 'src/modules');
      } else if (this.includeTypeScript) {
        this.directory('src/modules/typescript', 'src/modules');
      } else {
        this.directory('src/modules/javascript', 'src/modules');
      }

      if (this.includeJade) {
        this.copy('src/templates/jade/index.jade', 'src/modules');
        this.copy('src/templates/jade/layout.jade', 'src/modules/app/foo/layout.jade');
      } else {
        this.copy('src/templates/jade/index.html', 'src/modules');
        this.copy('src/templates/jade/layout.html', 'src/modules/app/foo/layout.jade');
      }
    },
    writeStyles: function () {
      if (this.includeSass) {
        this.copy('src/styles/sass', 'src/styles');
      } else if (this.includeLess) {
        this.copy('src/styles/less', 'src/styles');
      } else {
        this.copy('src/styles/css', 'src/styles');
      }
    }
  },
  install: function () {
    var done = this.async();
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install'],
      callback: function () {
        if (this.options['skip-install']) {
          this.log('To finish the installation, run `' + chalk.blue('bower install && npm install') + '`');
        }
        done();
      }.bind(this)
    });
  },
  end: function () {
  }
});
