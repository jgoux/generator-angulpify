'use strict';
module.exports = /*@ngInject*/

function configure ($stateProvider) {
  $stateProvider
    .state('welcome', {
      parent: 'app',
      url: '/welcome/{name}',
      templateUrl: 'welcome.html',
      controller: 'welcome as vm',
      params: {
        name: {
          value: ''
        }
      }
    });
};
