(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordSearchListController', KeywordSearchListController);

  KeywordSearchListController.$inject = [
    '_MockData',
    '$scope', '$state',
    'KeywordSearchListModel', 'Places'
  ];

  function KeywordSearchListController(
    _MockData,
    $scope, $state,
    ThemeSearchListModel, Places
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ThemeSearchListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params.keywords :::\n", $state.params.keywords);
      console.log("$state.params.keywordString :::\n", $state.params.keywordString);
      // initPromise = init();
    }

    function onAfterEnter() {
      // initPromise
      //   .then((array) => {
      //     let premiumPlacesWrapper = array[0];
      //     let specialPlacesWrapper = array[1];
      //     let normalPlacesWrapper = array[2];
      //     // ThemeSearchListModel.premium.places = premiumPlacesWrapper.places;
      //     // ThemeSearchListModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, ThemeSearchListModel.normal, 'places');
      //   })
    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {
      let premiumPromise = placeFind({ category: 'PREMIUM' });
      let specialPromise = placeFind({ category: 'SPECIAL' });
      let normalPromise = placeFind({ category: 'NORMAL' });
      return $q.all([premiumPromise, specialPromise, normalPromise])
        .then((array) => {
          return array;
        })
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function placeFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          keywords: $state.params.keywords,
          sort: {},
          limit: 30
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.find(queryWrapper).$promise
        .then((placeList) => {
          return placeList;
        });
    }
  }
})();
