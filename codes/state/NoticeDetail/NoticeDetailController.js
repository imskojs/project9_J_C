(function() {
  'use strict';
  angular.module('app')
    .controller('NoticeDetailController', NoticeDetailController);

  NoticeDetailController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'NoticeDetailModel', 'Util', 'Posts'
  ];

  function NoticeDetailController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    NoticeDetailModel, Util, Posts
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = NoticeDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((post) => {
            return Util.bindData(post, vm.Model, 'post');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
          })
          .catch((err) => {
            return Util.error(err);
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

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      return postFindOne({ id: $state.params.postId })
        .then(post => {
          return post;
        });
    }

    function reset() {
      var Model = {
        loading: false,
        post: {}
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function postFindOne(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then((post) => {
          console.log("post :::\n", post);
          // Resource object안에 array가 존재
          // {events: [{id:101, name:'aaa'}, {id: 102, name:'bbb'} ...]}
          return post;
        });
    }
  }
})();