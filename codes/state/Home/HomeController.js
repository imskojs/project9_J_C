(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '_MockData',
    '$scope',
    'Util', 'HomeModel', 'Banners', 'CurrentPosition', 'AppStorage'
  ];

  function HomeController(
    _MockData,
    $scope,
    Util, HomeModel, Banners, CurrentPosition, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = HomeModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    vm.goToStateIfGPS = goToStateIfGPS;

    //====================================================
    //  View Event
    //====================================================
    function onBeforeEnter() {
      console.log(_MockData);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(HomeModel);
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
    function goToStateIfGPS(state, params, direction) {
      if (AppStorage.currentPosition) {
        return Util.goToState(state, params, direction);
      } else {
        AppStorage.currentPosition = {};
      }
      return CurrentPosition.set(AppStorage.currentPosition)
        .then(() => {
          return Util.goToState(state, params, direction);
        })
        .catch((err) => {
          AppStorage.currentPosition = null;
          if (err.message === 'geolocationOff') {
            return false;
          }
          return Util.error(err);
        });

    }

    //====================================================
    //  Private
    //====================================================
    function init() { //서버에 query
      return bannerFindFive();
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
