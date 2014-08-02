'use strict'

module.exports = angular.module('<%= appname %>.common', [
  require('./directives/index').name
  require('./filters/index').name
  require('./services/index').name
])
