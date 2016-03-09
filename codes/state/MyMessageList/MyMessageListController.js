(function() {
  'use strict';
  angular.module('app')
    .controller('MyMessageListController', MyMessageListController);

  MyMessageListController.$inject = [
    '_MockData',
    '$scope', '$state',
    'MyMessageListModel'
  ];

  function MyMessageListController(
    _MockData,
    $scope, $state,
    MyMessageListModel
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = MyMessageListModel;

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
      //     // MyMessageListModel.premium.places = premiumPlacesWrapper.places;
      //     // MyMessageListModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, MyMessageListModel.normal, 'places');
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
