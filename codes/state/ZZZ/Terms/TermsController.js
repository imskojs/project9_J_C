(function() {
  'use strict';
  angular.module('app')
    .controller('zTermsController', zTermsController);

  zTermsController.$inject = [
    '$scope',
    'zTermModel', 'Util',
    'APP_NAME_KOREAN'
  ];

  function zTermsController(
    $scope,
    zTermModel, Util,
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
      Util.freeze(false);
    }
    //====================================================
    //  Implementation
    //====================================================
  }
})();
