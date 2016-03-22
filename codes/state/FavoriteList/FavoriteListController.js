(function() {
  'use strict';
  angular.module('app')
    .controller('FavoriteListController', FavoriteListController);

  FavoriteListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$window',
    'FavoriteListModel', 'Util', 'Places', 'Distance', 'CurrentPosition', 'AppStorage', 'Favorites'
  ];

  function FavoriteListController(
    _MockData,
    $ionicHistory, $scope, $q, $window,
    FavoriteListModel, Util, Places, Distance, CurrentPosition, AppStorage, Favorites

  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = FavoriteListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);
    vm.getAverageRating = getAverageRating;

    vm.setCurrentPosition = setCurrentPosition;
    vm.loadMore = loadMore;
    vm.infiniteScroll = infiniteScroll;

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
        //3개의 array Promise가 들어있는 array Promise 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((placesWrapper) => { //initPromise 를 실행하고 나온 결과값인가?
            Distance.createDistanceProperty(placesWrapper.places, AppStorage.currentPosition);
            return Util.bindData(placesWrapper, vm.Model, 'places');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
          })
          .catch((err) => {
            Util.error(err);
          });
        /*  bindData(data, model, name, emitEventTrue, loadingModel)
            "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
            model[name] = data;
            model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
            ==> Model.places = PlaceWrapper
            ==> Model.places = PlaceWrapper.places  */
        // console.log("_MockData :::\n", _MockData);
        // Util.bindData(_MockData, vm.Model, 'places');
      } else {
        Util.freeze(false);
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

    // set stars on view.
    function getAverageRating(num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i = 0; i < roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    function setCurrentPosition() {
      if (!AppStorage.currentPosition) {
        AppStorage.currentPosition = {};
      }
      Util.loading(vm.Model);
      return CurrentPosition.set(AppStorage.currentPosition, 'noLoadingIcon')
        .then((currentPosition) => {
          console.log("currentPosition :::\n", currentPosition);
          initPromise = init();
          onAfterEnter();
        });
    }

    function loadMore(category) {
      vm.Model[category].buttonLoading = true;
      return placeFindNative({
          category: category,
        }, {
          skip: vm.Model[category].places.length,
          limit: 1
        })
        .then((placesWrapper) => {
          console.log("placesWrapper --loadMore-- :::\n", placesWrapper);
          Distance.createDistanceProperty(placesWrapper.places, AppStorage.currentPosition);
          return Util.appendData(placesWrapper, vm.Model[category], 'places');
        })
        .then(() => {
          vm.Model[category].buttonLoading = false;
        })
        .then(() => {})
        .catch((err) => {
          vm.Model[category].buttonLoading = false;
          Util.error(err);
        });
    }

    function infiniteScroll() {
      var last = vm.Model.places.length - 1;
      var searchObj = {
        category: 'NOTICE',
        id: {
          '<': vm.Model.places[last].id,
        },
      };
      return favoriteFind({ owner: AppStorage.user.id })
        .then(function(placesWrapper) {
          return Util.appendData(placesWrapper, vm.Model, 'places');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      return favoriteFind({ owner: AppStorage.user.id })
        .then(aaa => {
          return aaa;
        });
    }

    function reset() {}

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function favoriteFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Favorites.find(queryWrapper).$promise
        .then((favoritesWrapper) => {
          var placeIds = _.map(favoritesWrapper.favorites, 'place');
          console.log("favoritesWrapper :::\n", favoritesWrapper);
          return placeFind({ id: placeIds });
        });
    }

    function placeFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {
            geoJSON: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [
                    AppStorage.currentPosition.longitude,
                    AppStorage.currentPosition.latitude
                  ] //longitude, latitude
                },
                $maxDistance: 999999
              }
            },
            // tags: {$in: tags },
            // filter = new RegExp([filter].join(""), "i");
            // $or: [{'name': filter }, {'description': filter }, {'createdBy': filter }],
            // id: {$gt: someId }, id: {$lt: someId }
          },
          // skip: 30,
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
          console.log("placesWrapper :::\n", placesWrapper);
          return placesWrapper; //object안에 array가 존재
        });
    }
  }
})();