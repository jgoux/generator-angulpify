'use strict';
module.exports =

/*@ngInject*/
function welcome ($stateParams, environment) {
  var vm = this;

  vm.name = $stateParams.name;
  vm.environment = environment;
};
