'use strict';

var path = require('path');
var args = require('yargs').argv;
var gutil = require('gulp-util');
var requireDir = require('require-dir');

// Detect the environment
var allowedEnvs = ['dev', 'prod'];
global.env = args.env || 'dev';
global.env = global.env.toLowerCase();
if (allowedEnvs.indexOf(global.env) === -1) {
  gutil.log('Invalid value', gutil.colors.red(args.env), 'for',  gutil.colors.magenta('--env'), 'option. Allowed values :', '['+envs.map(function(env){return gutil.colors.magenta(env);}).join(', ')+']');
  process.exit();
}

requireDir(path.join('./gulp/tasks'), {recurse: true});
