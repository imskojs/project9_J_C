(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordSearchListController', KeywordSearchListController);

  KeywordSearchListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state', '$q',
    'KeywordSearchListModel', 'Util', 'Places', 'Distance', 'CurrentPosition', 'AppStorage'
  ];

  function KeywordSearchListController(
    _MockData,
    $ionicHistory, $scope, $state, $q,
    KeywordSearchListModel, Util, Places, Distance, CurrentPosition, AppStorage
  ) {
    // var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.PlaceDetail'
    ];
    var noResetStates = [
      'Main.PlaceDetail'
    ];
    var vm = this;
    vm.Model = KeywordSearchListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    vm.getAverageRating = getAverageRating;
    vm.setCurrentPosition = setCurrentPosition;
    vm.loadMore = loadMore;



    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
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
          .then((array) => { //initPromise 를 실행하고 나온 결과값인가?
            let premiumPlacesWrapper = array[0];
            let specialPlacesWrapper = array[1];
            let normalPlacesWrapper = array[2];

            Distance.createDistanceProperty(premiumPlacesWrapper.places, AppStorage.currentPosition);
            Distance.createDistanceProperty(specialPlacesWrapper.places, AppStorage.currentPosition);
            Distance.createDistanceProperty(normalPlacesWrapper.places, AppStorage.currentPosition);

            vm.Model.PREMIUM.places = premiumPlacesWrapper.places;
            vm.Model.SPECIAL.places = specialPlacesWrapper.places; //바인딩 되는것은 이거나 아래나 똑같지만,
            return Util.bindData(normalPlacesWrapper, vm.Model.NORMAL, 'places', false, vm.Model); //content 안에서 refresh 하는듯한 로직이 담겨있다.
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

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      let premiumPromise = placeFindNative({ category: 'PREMIUM', });
      let specialPromise = placeFindNative({ category: 'SPECIAL', });
      let normalPromise = placeFindNative({ category: 'NORMAL', });
      return $q.all([premiumPromise, specialPromise, normalPromise])
        .then((array) => { //위의 3개의 array promise를 보내서
          return array; //하나의 array promise가 return됨. (무슨 작업을 하는지는 의문)
        });
    }

    function reset() {
      var Model = {
        loading: false,
        longitude: 126,
        latitude: 37,
        PREMIUM: {
          places: [],
          buttonLoading: false
        },
        SPECIAL: {
          places: [],
          buttonLoading: false
        },
        NORMAL: {
          places: [],
          buttonLoading: false
        }
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modals
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
                  type: "Point",
                  coordinates: [
                    AppStorage.currentPosition.longitude,
                    AppStorage.currentPosition.latitude
                  ] //longitude, latitude
                },
                $maxDistance: 999999
              }
            },
            keywords: { $in: $state.params.keywords } //string이 담긴 Array를 전달
            // tags: {$in: tags },
            // filter = new RegExp([filter].join(""), "i");
            // $or: [{'name': filter }, {'description': filter }, {'createdBy': filter }],
            // id: {$gt: someId }, id: {$lt: someId }
          },
          // skip: 30,
          limit: 3,
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