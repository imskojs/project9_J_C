(function() {
  'use strict';
  angular.module('app')
    .controller('CommentCreateController', CommentCreateController);

  CommentCreateController.$inject = [
    '_MockData',
    '$scope', '$state', '$q',
    'CommentCreateModel', 'Util', 'RootScope', 'AppStorage', 'Users', 'Reviews', 'Comments'
  ];

  function CommentCreateController(
    _MockData,
    $scope, $state, $q,
    CommentCreateModel, Util, RootScope, AppStorage, Users, Reviews, Comments
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
      console.log('\n\n\n====================\n'+$state.current.url+'\n====================\n');
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params :::\n", $state.params);
    }

    function onAfterEnter() {
      initPromise
        .then(array => {
          let user = array[0];
          let review = array[1];
          vm.Model.reviewOwner = user;
          Util.bindData(review, vm.Model, 'review');
        })
      // var review = _MockData.findOne($state.params.reviewId);
      // console.log("review :::\n", review);
      // Util.bindData(review, vm.Model, 'review');

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
      let userPromise = userFind({ id: $state.params.reviewOwner.id });
      let reviewPromise = reviewFind({ id: $state.params.reviewId }, { populate: ['photos'] });
      return $q.all([userPromise, reviewPromise])
        .then(array => {
          return array;
        });
    }

    function reset() {
      var defaultObj = {
        loading: false,
        user: {},  //로그인한 유저 본인, 세션
        review: {},
        reviewOwner: {},
        comment: {
          content: ''
        }
      };
      angular.copy(defaultObj, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function userFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Users.findOne(queryWrapper).$promise
        .then(user => {
          console.log("user :::\n", user);
          return user;
        });
    }

    function reviewFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Reviews.findOne(queryWrapper).$promise
        .then(review => {    //{id: 1300, name: 'asda' ... }
          console.log("review :::\n", review);
          return review;
        });
    }

    function commentCreate() {
      vm.Model.loading = true;
      let queryWrapper = {
        query: {
          review: $state.params.reviewId,
          content: vm.Model.comment.content,
          category: 'REVIEW-COMMENT'
        }
      };
      return Comments.createComment(null, queryWrapper).$promise
        .then((createdComment) => {
          vm.Model.loading = false;
          RootScope.goBack('forward');
        })
    }
  }
})();
