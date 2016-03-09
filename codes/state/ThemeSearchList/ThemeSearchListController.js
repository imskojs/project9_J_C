(function() {
  'use strict';
  angular.module('app')
    .controller('ThemeSearchListController', ThemeSearchListController);

  ThemeSearchListController.$inject = [
    '_MockData',
    '$scope', '$state',
    'ThemeSearchListModel', 'Places'
  ];

  function ThemeSearchListController(
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
      console.log("$state.params.themeTitle :::\n", $state.params.themeTitle);
      switch ($state.params.themeTitle) {
        case '헌팅'       : vm.Model.themeTitle = '감성충만한 여우와 늑대의 만남 [헌팅]'; break;
        case '데이트'     : vm.Model.themeTitle = '자기야 오붓하게 한잔할까~♥ [데이트]'; break;
        case '단체'       : vm.Model.themeTitle = '선배님 모임장소 알아놨습니다!!! [단체]'; break;
        case '술마시기좋은': vm.Model.themeTitle = '내 오늘 진정 주당이 되겠노라. [술마시기좋은]'; break;
        case '안주가맛있는': vm.Model.themeTitle = '안주빨들 여기여기 붙어라 [안주가맛있는]'; break;
      }
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
          keywords: $state.params.themeTitle,
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
