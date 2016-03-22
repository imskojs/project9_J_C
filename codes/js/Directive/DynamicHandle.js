// Calls a specified function when enter is pressed on input
// Usage
// <input ng-enter="vm.myFunction()"></input>
(function(angular) {
  'use strict';
  angular.module('app')
    .directive('dynamicHandle', dynamicHandle);

  dynamicHandle.$inject = [];

  function dynamicHandle() {
    var DDO = {
      priority: 10000,
      restrict: 'A',
      compile: compile
    };

    return DDO;

    function compile(tElement, tAttrs) {
      tAttrs.$set('delegate-handle', 'home');
      return function() {};
    }
  }
})(angular);
