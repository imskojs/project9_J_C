(function() {
  'use strict';
  angular.module('app')
    .controller('ReviewCreateController', ReviewCreateController);

  ReviewCreateController.$inject = [
    '_MockData',
    '$scope', '$q', '$state',
    'ReviewCreateModel', 'Util', 'RootScope', 'Places'
  ];

  function ReviewCreateController(
    _MockData,
    $scope, $q, $state,
    ReviewCreateModel, Util, RootScope, Places
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ReviewCreateModel;
    vm.setRating = setRating;
    vm.reviewCreate = reviewCreate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(ReviewCreateModel);
        // initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params.placeId :::\n", $state.params.placeId);
    }

    function onAfterEnter() {
      // initPromise
      //   .then(place => {    //{id: 1300, name: 'asda' ... }
      //     Util.bindData(place, ReviewCreateModel, 'place');  //Model['place'] = place
      //   })
      vm.Model.review.place.id = $state.params.placeId;

    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  VM
    //====================================================

    //리뷰 더보기 버튼 클릭
    function setRating (rating) {
      vm.Model.review.rating = rating;
      console.log("vm.Model.review.rating :::\n", vm.Model.review.rating);
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
      vm.Model.review.rating = 0;
      vm.Model.review.content = '';
      vm.Model.review.photos = [];
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function reviewCreate () {
      console.log("vm.Model.review.rating :::\n", vm.Model.review.rating);
      console.log("vm.Model.review.content :::\n", vm.Model.review.content);
      console.log("vm.Model.review.photos :::\n", vm.Model.review.photos);
      var queryWrapper = {
        where: {},
      };
      //Review.create(queryWrapper);
      RootScope.goToState('Main.PlaceDetail', {placeId: vm.Model.review.place.id}, 'forward');
    }
  }
})();
