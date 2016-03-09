(function() {
  'use strict';
  angular.module('app')
    .controller('MyTalkListController', MyTalkListController);

  MyTalkListController.$inject = [
    '_MockData',
    '$scope', '$state',
    'MyTalkListModel'
  ];

  function MyTalkListController(
    _MockData,
    $scope, $state,
    MyTalkListModel
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = MyTalkListModel;
    vm.categoryToggle = categoryToggle;
    vm.selectCategory = selectCategory;

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
      //     // MyTalkListModel.premium.places = premiumPlacesWrapper.places;
      //     // MyTalkListModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, MyTalkListModel.normal, 'places');
      //   })
    }

    //====================================================
    //  VM
    //====================================================

    function categoryToggle() {
      var status = vm.Model.categoryToggle;  //true & false
      if (status) {
        vm.Model.categoryToggle = false;
      } else {
        vm.Model.categoryToggle = true;
      }
    }

    function selectCategory(category) {
      console.log("category :::\n", category);
      vm.Model.selectedCategory = category;
    }

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
