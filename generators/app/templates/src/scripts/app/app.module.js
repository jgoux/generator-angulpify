'use strict';

angular
  .module('app', [
    require('./core/core.module').name,
    require('./welcome/welcome.module').name,
    require('./layout/layout.module').name
  ])
  .config(require('./app.config'));
