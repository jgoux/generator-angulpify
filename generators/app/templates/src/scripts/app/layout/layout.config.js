'use strict';
module.exports = /*@ngInject*/

function configure ($stateProvider) {
  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'layout.html'
    });
};
