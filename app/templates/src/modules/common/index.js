'use strict';

module.exports =
    angular.module('<%= appname %>.common', [
        require('./directives').name,
        require('./filters').name,
        require('./services').name
    ]);