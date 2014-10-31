'use strict';
module.exports =

angular
  .module('app.welcome', [])
  .config(require('./welcome.config'))
  .controller('welcome', require('./welcome.controller'));
