(function() {
  'use strict';
  angular.module('app')
    .controller('SearchTabController', SearchTabController);

  SearchTabController.$inject = [
    '_MockData',
    '$scope', '$state',
    'SearchTabModel', 'RootScope'
  ];

  function SearchTabController(
    _MockData,
    $scope, $state,
    SearchTabModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = SearchTabModel;
    vm.goToState = goToState;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {}
    function onAfterEnter() {}

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
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

  }
})();
