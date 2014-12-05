'use strict';

module.exports = /*@ngInject*/
  function configure ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome/');
  };
