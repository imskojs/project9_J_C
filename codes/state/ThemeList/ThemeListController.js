(function() {
  'use strict';
  angular.module('app')
    .controller('ThemeListController', ThemeListController);

  ThemeListController.$inject = [
    '_MockData',
    '$scope',
    'ThemeListModel', 'RootScope'
  ];

  function ThemeListController(
    _MockData,
    $scope,
    ThemeListModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ThemeListModel;
    vm.search = search;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {

    }

    function onAfterEnter() {

    }

    function search (theme) {
      console.log("theme.title :::\n", theme.title);
      RootScope.goToState('Main.ThemeSearchList', {
        themeTitle: theme.title
      }, 'forward');
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
