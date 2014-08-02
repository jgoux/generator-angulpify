'use strict'

module.exports = angular.module('<%= appname %>.foo', [])
    .config((<% if (includeUIRouter) { %>$stateProvider<% } else { %>$routeProvider<% } %>) ->
      <% if (includeUIRouter) { %>$stateProvider.state 'foo',
      url: ''<% } else { %>$routeProvider.when '/',<% } %>
      templateUrl: 'app/foo/layout.html'
      controller: 'fooController'
      return
).controller('fooController', require('./fooController'))
