(function() {
  'use strict';
  angular.module('app')
    .controller('ProvinceListController', ProvinceListController);

  ProvinceListController.$inject = [
    '$scope', '$timeout',
    'ProvinceListModel', 'Util'
  ];

  function ProvinceListController(
    $scope, $timeout,
    ProvinceListModel, Util
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = ProvinceListModel;
    vm.toggle = toggle;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      // console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        // Util.loading(vm.Model);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {}
    }

    function onBeforeLeave() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return reset();
      }
    }

    //====================================================
    //  VM
    //====================================================

    function toggle(key) {
      var index = vm.Model.toggleArray.indexOf(key);
      $timeout(function() {
        if (index != -1) {
          vm.Model.toggleArray.splice(index, 1);
        } else {
          vm.Model.toggleArray.push(key);
        }
      }, 0);
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {}

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
  }
})();