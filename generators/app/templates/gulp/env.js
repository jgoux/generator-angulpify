'use strict';

var args = require('yargs').argv;
var gutil = require('gulp-util');

var env = null;

module.exports = {
  detect: function() {
    var envs = ['dev', 'prod'];
    env = args.env || 'dev';
    env = env.toLowerCase();

    if (envs.indexOf(env) === -1) {
      gutil.log('Invalid value', gutil.colors.red(args.env), 'for',  gutil.colors.magenta('--env'), 'option. Allowed values :', '['+envs.map(function(env){return gutil.colors.magenta(env);}).join(', ')+']');
      process.exit();
    }
  },
  isDev: function() {
    return env === 'dev'
  },
  isProd: function() {
    return env === 'prod'
  },
  getEnv: function() {
    return env;
  }
};
