'use strict';

angular
  .module('<%=project%>', [
    require('./core/core.module.js').name,
    require('./welcome/welcome.module.js').name,
    require('./layout/layout.module.js').name
  ])
  .config(require('./app.config.js'));
