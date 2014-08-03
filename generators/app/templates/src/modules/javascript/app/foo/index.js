'use strict';

module.exports =
  angular.module('<%= appname %>.foo', [
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
    .config(function (
<% if (includeUIRouter) { %>$stateProvider<% } else { %>$routeProvider<% } %>) {
<% if (includeUIRouter) { %>$stateProvider
    .state('foo', {
      url: '',
      templateUrl: 'app/foo/layout.html',
      controller: 'fooController'
    });<% } else { %>$routeProvider
    .when('/', {
      templateUrl: 'app/foo/layout.html',
      controller: 'fooController'
    });<% } %>
  })
  .controller('fooController', require('./fooController'));
