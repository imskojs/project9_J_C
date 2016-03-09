(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceListController', PlaceListController);

  PlaceListController.$inject = [
    '_MockData',
    '$scope', '$q',
    'PlaceListModel', 'Util', 'Places'
  ];

  function PlaceListController(
    _MockData,
    $scope, $q,
    PlaceListModel, Util, Places
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = PlaceListModel;
    vm.getAverageRating = getAverageRating;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(PlaceListModel);
        // initPromise = init();
        //3개의 array Promise가 들어있는 array Promise 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      // initPromise
      //   .then((array) => {  //initPromise 를 실행하고 나온 결과값인가?
      //     let premiumPlacesWrapper = array[0];
      //     let specialPlacesWrapper = array[1];
      //     let normalPlacesWrapper = array[2];
      //     PlaceListModel.premium.places = premiumPlacesWrapper.places;
      //     PlaceListModel.special.places = specialPlacesWrapper.places;  //바인딩 되는것은 이거나 아래나 똑같지만,
      //     Util.bindData(normalPlacesWrapper, PlaceListModel.normal, 'places');  //content 안에서 refresh 하는듯한 로직이 담겨있다.
      //   })
          /*  bindData(data, model, name, emitEventTrue, loadingModel)
              "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
              model[name] = data;
              model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
              ==> Model.places = PlaceWrapper
              ==> Model.places = PlaceWrapper.places  */
      console.log("_MockData :::\n", _MockData);
      Util.bindData(_MockData, PlaceListModel, 'places');
      console.log("PlaceListModel :::\n", PlaceListModel);
      Util.freeze(false);
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  VM
    //====================================================

    function getAverageRating (num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i=0; i<roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    //====================================================
    //  Private
    //====================================================

    function init() {  //서버에서 data를 가져오는 작업을 진행함.
      let premiumPromise = placeFind({ category: 'PREMIUM' });
      let specialPromise = placeFind({ category: 'SPECIAL' });
      let normalPromise = placeFind({ category: 'NORMAL' });
      return $q.all([premiumPromise, specialPromise, normalPromise])
        .then((array) => {  //위의 3개의 array promise를 보내서
          return array;     //하나의 array promise가 return됨. (무슨 작업을 하는지는 의문)
        });
    }

    function reset() {
      // vm.Model.review.rating = 0;
      // vm.Model.review.content = '';
      // vm.Model.review.photos = [];
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
          sort: {},
          limit: 30
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.find(queryWrapper).$promise
        .then((placesWrapper) => {
          return placesWrapper;  //object안에 array가 존재
        });
    }
  }
})();
