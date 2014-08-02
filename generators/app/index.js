'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var globby = require('globby');
var mkdirp = require('mkdirp');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
var coffeeScript = require('coffee-script');

var AngulpifyGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-welcome-message', {desc: 'Skip the welcome message'});
    this.option('skip-install', {desc: 'Skip the bower and node installations'});
  },
  initializing: function () {
    this.directoryTransform = function (source, destination, transformer, process, bulk) {
      // Only add sourceRoot if the path is not absolute
      var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
      var files = this.expandFiles('**', { dot: true, cwd: root });

      destination = destination || source;

      if (typeof destination === 'function') {
        process = destination;
        destination = source;
      }

      var cp = this.copyTransform;
      if (bulk) {
        cp = this.bulkCopy;
      }

      // get the path relative to the template root, and copy to the relative destination
      for (var i in files) {
        var dest = path.join(destination, files[i]);
        cp.call(this, path.join(root, files[i]), dest, transformer, process);
      }

      return this;
    };
    this.copyTransform = function (source, destination, transformer, process) {

      var file = this._prepCopy(source, destination, process);

      try {
        file.body = this.engine(file.body, this);
      } catch (err) {
        // this happens in some cases when trying to copy a JS file like lodash/underscore
        // (conflicting the templating engine)
      }

      transformer(file);

      this.checkForCollision(file.destination, file.body, function (err, config) {
        var stats;

        if (err) {
          config.callback(err);
          return this.emit('error', err);
        }

        // create or force means file write, identical or skip prevent the
        // actual write.
        if (!/force|create/.test(config.status)) {
          return config.callback();
        }

        mkdirp.sync(path.dirname(file.destination));
        fs.writeFileSync(file.destination, file.body);

        // synchronize stats and modification times from the original file.
        stats = fs.statSync(file.source);
        try {
          fs.chmodSync(file.destination, stats.mode);
          fs.utimesSync(file.destination, stats.atime, stats.mtime);
        } catch (err) {
          this.log.error('Error setting permissions of "' + chalk.bold(file.destination) + '" file: ' + err);
        }

        config.callback();
      }.bind(this));

      return this;
    };
  },
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
        type: 'checkbox',
        name: 'languages',
        message: 'What languages would you like?',
        choices: [
          {
            name: 'CoffeeScript',
            value: 'includeCoffeeScript',
            checked: true
          },
          {
            name: 'Jade',
            value: 'includeJade',
            checked: true
          },
          {
            name: 'Sass',
            value: 'includeSass',
            checked: true
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'goodies',
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
      var features = answers.languages.concat(answers.goodies);
      var hasFeature = function (feature) {
        return features.indexOf(feature) !== -1;
      };

      this.appname = answers.projectName;
      this.includeCoffeeScript = hasFeature('includeCoffeeScript');
      this.includeJade = hasFeature('includeJade');
      this.includeSass = hasFeature('includeSass');
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
    writeModules: function () {
      var _this = this;
      this.directoryTransform('src/modules', 'src/modules', function (file) {
        if (!_this.includeCoffeeScript && path.extname(file.source) === '.coffee') {
          file.body = coffeeScript.compile(file.body, {bare: true});
          file.destination = file.destination.replace('.coffee', '.js');
        }
        if (!_this.includeJade && path.extname(file.source) === '.jade') {
          file.body = jade.render(file.body, {pretty: true});
          file.destination = file.destination.replace('.jade', '.html');
        }
      });
      this.copyTransform('src/index.jade', 'src/index.jade', function (file) {
        if (!_this.includeJade) {
          file.body = jade.render(file.body, {pretty: true});
          file.destination = file.destination.replace('.jade', '.html');
        }
      });
    },
    writeAssets: function () {
      this.directory('src/assets', 'src/assets');
    },
    writeStyles: function () {
      this.directory('src/styles', 'src/styles');
    }
  },
  install: function () {

  },
  end: function () {

  }
});

/*
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
*/
