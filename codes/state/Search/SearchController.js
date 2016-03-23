(function() {
  'use strict';
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = [
    '$scope', '$q', '$ionicHistory',
    'SearchModel', 'Places', 'AppStorage', 'Util', 'Distance'
  ];

  function SearchController(
    $scope, $q, $ionicHistory,
    SearchModel, Places, AppStorage, Util, Distance
  ) {
    var initPromise;
    var noLoadingStates = ['Main.PlaceDetail'];
    var noResetStates = [];
    var vm = this;
    vm.Model = SearchModel;

    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);

    vm.getAverageRating = getAverageRating;
    vm.search = search;

    //====================================================
    //  View Event
    //====================================================
    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        // Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((message) => {
            console.log("message :::\n", message);
          })
          .catch((err) => {
            Util.error(err);
          });
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
    function search() {
      if (!vm.Model.searchWord) {
        return;
      }
      vm.Model.loading = true;
      Util.loading(vm.Model);
      return placeFindNative({
          searchWord: vm.Model.searchWord
        }, {
          limit: 999
        })
        .then((placesWrapper) => {
          Distance.createDistanceProperty(placesWrapper.places, AppStorage.currentPosition);
          return Util.bindData(placesWrapper, vm.Model, 'places');
        })
        .then(() => {

          console.log("vm.Model.places :::\n", vm.Model.places);
          Util.freeze(true);
          vm.Model.loading = false;
        })
        .catch((err) => {
          Util.error(err);
        });
    }

    // set stars on view.
    function getAverageRating(num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i = 0; i < roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    //====================================================
    //  Private
    //====================================================
    function init() {
      return $q.resolve({ message: 'empty' });
    }

    function reset() {
      // vm.Model.searchWord = '';
      vm.Model.loading = false;
      // let defaultObj = {
      //   searchWord: '',
      //   loading: false,
      //   places: []
      // };
      // angular.copy(defaultObj, vm.Model);
    }
    //====================================================
    //  Modal
    //====================================================

    //====================================================
    //  REST
    //====================================================
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

          limit: 999,
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
  }
})();