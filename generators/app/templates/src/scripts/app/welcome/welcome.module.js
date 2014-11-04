'use strict';
module.exports =

angular
  .module('app.welcome', [])
  .config(require('./welcome.config.js'))
  .controller('welcome', require('./welcome.controller.js'));
