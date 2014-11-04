'use strict';
module.exports =

angular
  .module('<%=project%>.core', [
    'ui.router',
    require('../../../../.tmp/config').name,
    require('../../../../.tmp/templates').name
  ]);
