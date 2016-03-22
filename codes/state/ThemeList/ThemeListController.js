(function() {
  'use strict';
  angular.module('app')
    .controller('ThemeListController', ThemeListController);

  ThemeListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'ThemeListModel', 'Util', 'RootScope'
  ];

  function ThemeListController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    ThemeListModel, Util, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = ThemeListModel;

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
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      Util.freeze(false);
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1
      ) {
        return reset();
      }
    }


    //====================================================
    //  VM
    //====================================================

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