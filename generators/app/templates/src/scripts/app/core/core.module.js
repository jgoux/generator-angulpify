'use strict';
module.exports =

angular
  .module('app.core', [
    'ui.router',
    require('../../../../.tmp/config').name,
    require('../../../../.tmp/templates').name
  ]);
