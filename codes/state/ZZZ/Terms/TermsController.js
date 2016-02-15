(function() {
  'use strict';
  angular.module('app')
    .controller('zTermsController', zTermsController);

  zTermsController.$inject = [
    '$scope',
    'zTermModel', 'U',
    'APP_NAME_KOREAN'
  ];

  function zTermsController(
    $scope,
    zTermModel, U,
    APP_NAME_KOREAN
  ) {
    var Terms = this;
    Terms.Model = zTermModel;

    Terms.appKorean = APP_NAME_KOREAN;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      U.freeze(false);
    }
    //====================================================
    //  Implementation
    //====================================================
  }
})();
