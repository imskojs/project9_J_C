(function() {
  'use strict';
  angular.module('app')
    .controller('ProvinceListController', ProvinceListController);

  ProvinceListController.$inject = [
    '_MockData',
    '$scope',
    'ProvinceListModel', 'Util', 'Events'
  ];

  function ProvinceListController(
    _MockData,
    $scope,
    ProvinceListModel, Util, Events
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ProvinceListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {

    }

    function onAfterEnter() {

    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {
      //업체정보를 가져오는 로직
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
  }
})();
