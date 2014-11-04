'use strict';
module.exports =

angular
  .module('<%=project%>.welcome', [])
  .config(require('./welcome.config.js'))
  .controller('welcome', require('./welcome.controller.js'));
