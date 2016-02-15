// Simple dom manipulation when making directive is a overkill
// USAGE;
// In View;
//<input id="daum-map-search-input" type="text">
// In controller;
//Dom.focusById('daum-map-search-input');
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Dom', Dom);

  Dom.$inject = ['$timeout', '$window'];

  function Dom($timeout, $window) {
    var service = {
      focusById: focusById,
      blurById: blurById,
    };

    return service;

    function focusById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.focus();
        }
      }, 0);
    }

    function blurById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.blur();
        }
      }, 0);
    }
  }

})(angular);
