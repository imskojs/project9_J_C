(function() {
  'use strict';
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = [
    '$scope',
    'SearchModel', 'Places', 'AppStorage', 'Util', 'Distance'
  ];

  function SearchController(
    $scope,
    SearchModel, Places, AppStorage, Util, Distance
  ) {
    var vm = this;
    vm.Model = SearchModel;
    vm.getAverageRating = getAverageRating;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    vm.search = search;

    //====================================================
    //  View Event
    //====================================================
    function onBeforeLeave() {
      return reset();
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
    function reset() {
      vm.Model.searchWord = '';
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
  }
})();
