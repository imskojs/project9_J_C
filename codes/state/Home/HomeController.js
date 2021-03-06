(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$scope',
    'Util', 'HomeModel', 'Banners'
  ];

  function HomeController(
    $scope,
    Util, HomeModel, Banners
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = HomeModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================
    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        reset();
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((bannersWrapper) => {
            // bannersWrapper = {banners: [Banner, Banner, ..., Banner]}
            console.log("bannersWrapper :::\n", bannersWrapper);
            return Util.bindData(bannersWrapper, HomeModel, 'banners');
          })
          .then(() => {
            console.log("HomeModel.banners :::\n", HomeModel.banners);
          })
          .catch((err) => {
            Util.error(err);
          });
      }
    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================
    function init() { //서버에 query
      return bannerFindFive();
    }

    function reset() {
      console.log("'test' :::\n", 'test');
      let defaultObj = {
        handle: 'home',
        loading: false,
        banners: []
      };
      angular.copy(defaultObj, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
    function bannerFindFive(extraQuery, extraOperation) {
      //where: 조건, populate: join, skip/limit/sort
      let queryWrapper = {
        query: {
          where: {},
          populate: ['photo'],
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Banners.findFive(queryWrapper).$promise
        .then((bannersWrapper) => {
          return bannersWrapper;
        });

    }

  }
})();