'use strict';

//browserify-shim dependencies (can be edited in package.json)
require('angular');<% if (includeUIBootstrap) { %>
require('angular-ui-bootstrap');<% } if (includeUIRouter) { %>
require('angular-ui-router');<% } else { %>
require('angular-route');<% } %>
//app entry point
require('./app');
