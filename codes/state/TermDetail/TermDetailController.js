(function() {
  'use strict';
  angular.module('app')
    .controller('TermDetailController', TermDetailController);

  TermDetailController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state',
    'TermDetailModel', 'Util'
  ];

  function TermDetailController(
    _MockData,
    $ionicHistory, $scope, $state,
    TermDetailModel, Util
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = TermDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================
    function onBeforeEnter() {
      vm.Model.term = $state.params.term;
      if (!Util.hasPreviousStates(noLoadingStates)) {
        // Util.loading(vm.Model);
        // initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        // return initPromise
        //   .then((message) => {
        //     console.log("message :::\n", message);
        //   })
        //   .catch((err) => {
        //     Util.error(err);
        //   });
      }
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1
      ) {
        return reset();
      }
    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {
      var Model = {
        handle: 'term-detail',
        loading: false,
        term: {},
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modal
    //====================================================

    //====================================================
    //  REST
    //====================================================

    /*
    function placeFindNative(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {

          where: {
            geoJSON: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [
                    AppStorage.currentPosition.longitude,
                    AppStorage.currentPosition.latitude,
                  ]
                },
                $maxDistance: 999999
              }
            }
          },

          limit: 30,
          populate: [{
            property: 'photos',
            criteria: { sort: 'index ASC' }
          }]

        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.findNative(queryWrapper).$promise
        .then((placesWrapper) => {
          return placesWrapper;
        });
    }
    */
  }
})();