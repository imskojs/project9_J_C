(function() {
  'use strict';
  angular.module('app')
    .controller('ProvinceSearchListController', ProvinceSearchListController);

  ProvinceSearchListController.$inject = [
    '_MockData',
    '$scope', '$state',
    'ProvinceSearchListModel', 'Places'
  ];

  function ProvinceSearchListController(
    _MockData,
    $scope, $state,
    ProvinceSearchListModel, Places
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ProvinceSearchListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params.province :::\n", $state.params.province);
      // initPromise = init();
    }

    function onAfterEnter() {
      // initPromise
      //   .then((array) => {
      //     let premiumPlacesWrapper = array[0];
      //     let specialPlacesWrapper = array[1];
      //     let normalPlacesWrapper = array[2];
      //     // ProvinceSearchListModel.premium.places = premiumPlacesWrapper.places;
      //     // ProvinceSearchListModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, ProvinceSearchListModel.normal, 'places');
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
          keywords: $state.params.province,
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
