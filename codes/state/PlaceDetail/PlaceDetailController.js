(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '_MockData',
    '$scope', '$state',
    'PlaceDetailModel', 'Util', 'Places'
  ];

  function PlaceDetailController(
    _MockData,
    $scope, $state,
    PlaceDetailModel, Util, Places
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = PlaceDetailModel;
    vm.getAverageRating = getAverageRating;
    vm.moreReview = moreReview;
    vm.reviewDelete = reviewDelete;
    vm.commentDelete = commentDelete;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(PlaceDetailModel);
        // initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params :::\n", $state.params);
    }

    function onAfterEnter() {
      // initPromise
      //   .then(place => {    //{id: 1300, name: 'asda' ... }
      //     Util.bindData(place, PlaceDetailModel, 'place');  //Model['place'] = place
      //   })
      var place = _MockData.findOne($state.params.placeId);
      console.log("place :::\n", place);
      Util.bindData(place, PlaceDetailModel, 'place');
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

    //리뷰 더보기 버튼 클릭
    function moreReview () {

    }

    //====================================================
    //  Private
    //====================================================

    function init() {
      //$state.params.placeId 를 통해 Place를 findOne()
      return placeFind({id: $state.params.placeId})
        .then(place => {
          return place;
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
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.findOne(queryWrapper).$promise
        .then(place => {    //{id: 1300, name: 'asda' ... }
          return place;
        });
    }

    function reviewDelete () {
      // implementation
    }

    function commentDelete () {
      // implementation
    }
  }
})();
