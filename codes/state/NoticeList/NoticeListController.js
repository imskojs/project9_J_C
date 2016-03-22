(function() {
  'use strict';
  angular.module('app')
    .controller('NoticeListController', NoticeListController);

  NoticeListController.$inject = [
    '$ionicHistory', '$scope', '$q', '$state',
    'NoticeListModel', 'Util', 'Posts'
  ];

  function NoticeListController(
    $ionicHistory, $scope, $q, $state,
    NoticeListModel, Util, Posts
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.NoticeDetail'
    ];
    var noResetStates = [
      'Main.NoticeDetail'
    ];
    var vm = this;
    vm.Model = NoticeListModel;
    vm.infiniteScroll = infiniteScroll;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      // console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((postsWrapper) => {
            return Util.bindData(postsWrapper, vm.Model, 'posts');
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

    function infiniteScroll() {
      var last = vm.Model.posts.length - 1;
      var searchObj = {
        category: 'NOTICE',
        id: {
          '<': vm.Model.posts[last].id,
        },
      };
      return postFind(searchObj)
        .then(function(postsWrapper) {
          return Util.appendData(postsWrapper, vm.Model, 'posts');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      return postFind({ category: 'NOTICE' })
        .then(postsWrapper => {
          return postsWrapper;
        });
    }

    function reset() {}

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function postFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then((postsWrapper) => {
          console.log("postsWrapper :::\n", postsWrapper);
          // Resource object안에 array가 존재
          // {events: [{id:101, name:'aaa'}, {id: 102, name:'bbb'} ...]}
          return postsWrapper;
        });
    }
  }
})();