(function() {
  'use strict';
  angular.module('app')
    .controller('CommentCreateController', CommentCreateController);

  CommentCreateController.$inject = [
    '_MockData',
    '$scope', '$state',
    'CommentCreateModel', 'Util', 'RootScope', 'Users', 'AppStorage'
  ];

  function CommentCreateController(
    _MockData,
    $scope, $state,
    CommentCreateModel, Util, RootScope, Users, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = CommentCreateModel;
    vm.getAverageRating = getAverageRating;
    vm.commentCreate = commentCreate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(CommentCreateModel);
        // initPromise = init();
        //3개의 array Promise가 들어있는 array Promise 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
      console.log("$state.params :::\n", $state.params);
    }

    function onAfterEnter() {
      // initPromise
      //   .then(place => {    //{id: 1300, name: 'asda' ... }
      //     Util.bindData(place, CommentCreateModel, 'place');  //Model['place'] = place
      //   })
      var review = _MockData.findOne($state.params.reviewId);
      console.log("review :::\n", review);
      Util.bindData(review, CommentCreateModel, 'review');

      vm.Model.user = AppStorage.user;
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

    function init() {
      //return userFindOne();
      return reviewFind({id: $state.params.reviewId})
        .then(place => {
          return place;
        });
    }

    function reset() {
      vm.Model.comment.content = '';
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function userFindOne() {
      return Users.findOne({id: AppStorage.user.id})
        .$promise;
    }

    function reviewFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Review.findOne(queryWrapper).$promise
        .then(review => {    //{id: 1300, name: 'asda' ... }
          return review;
        });
    }

    function commentCreate() {
      console.log("vm.Model.comment.content :::\n", vm.Model.comment.content);
      // Comment.create()
      RootScope.goToState('Main.PlaceDetail', {placeId: $state.params.placeId}, 'forward');
    }
  }
})();
