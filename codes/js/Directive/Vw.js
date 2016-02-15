//====================================================
//  Usage
//====================================================
// Set by default in index.html
// make device width in pixels available globally
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('vw', vw);

  vw.$inject = ['$rootScope', '$window'];

  function vw($rootScope, $window) {
    return {
      link: link
    };

    function link(scope, element) {
      $rootScope.vw = element.prop('offsetWidth');

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.vw = element.prop('offsetWidth');
        });
      });
    }
  }


})(angular);
