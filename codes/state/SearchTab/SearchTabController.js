(function() {
  'use strict';
  angular.module('app')
    .controller('SearchTabController', SearchTabController);

  SearchTabController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state', 'Util',
    'SearchTabModel', 'RootScope'
  ];

  function SearchTabController(
    _MockData,
    $ionicHistory, $scope, $state, Util,
    SearchTabModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.Footer.SearchTab.ProvinceList',
      'Main.Footer.SearchTab.ThemeList',
      'Main.Footer.SearchTab.KeywordList',
    ];
    var vm = this;
    vm.Model = SearchTabModel;
    vm.goToState = goToState;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        reset();
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {}
    }

    function onBeforeLeave() {
      if (!Util.hasPreviousStates(noLoadingStates)) {}
    }

    //====================================================
    //  VM
    //====================================================

    function goToState(state, params) {
      if ($state.includes('Main.Footer.SearchTab.ProvinceList')) {
        return RootScope.goToState(state, params, 'forward');

      } else if ($state.includes('Main.Footer.SearchTab.ThemeList')) {
        switch (state) {
          case 'Main.Footer.SearchTab.ProvinceList':
            return RootScope.goToState(state, params, 'back');
          case 'Main.Footer.SearchTab.KeywordList':
            return RootScope.goToState(state, params, 'forward');
        }

      } else if ($state.includes('Main.Footer.SearchTab.KeywordList')) {
        return RootScope.goToState(state, params, 'back');
      }
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {
      var Model = {
        handle: 'search-tab',
        loading: false,
        currentTab: 'PROVINCE'
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

  }
})();