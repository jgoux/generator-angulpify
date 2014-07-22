'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AngulpifyGenerator = module.exports = function AngulpifyGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.options = options;
};

util.inherits(AngulpifyGenerator, yeoman.generators.Base);

AngulpifyGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    if (!this.options['skip-welcome-message']) {
        this.log(yosay());
        this.log(chalk.magenta('Out of the box I include AngularJS, Gulp tasks and Browserify to build your app.'));
    }

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What\'s your project name?',
        default: this.appname
    }];

    this.prompt(prompts, function (answers) {
        this.appname = this._.slugify(answers.name);
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
    this.template('bower.json');
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
    this.copy('app.scss', 'src/styles/app.scss');
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
