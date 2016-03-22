(function() {
  'use strict';
  angular.module('app')
    .controller('FaqListController', FaqListController);

  FaqListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'FaqListModel', 'Util', 'Posts'
  ];

  function FaqListController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    FaqListModel, Util, Posts
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = FaqListModel;
    vm.toggle = toggle;
    vm.toggleArray = [];
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

    function toggle(post) {
      var index = vm.toggleArray.indexOf(post.id);
      if (index === -1) {
        vm.toggleArray.push(post.id);
      } else {
        vm.toggleArray.splice(index, 1);
      }
    }

    function infiniteScroll() {
      var last = vm.Model.posts.length - 1;
      var searchObj = {
        category: 'FAQ',
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
      return postFind({ category: 'FAQ' })
        .then(postsWrapper => {
          return postsWrapper;
        });
    }

    function reset() {
      var Model = {
        loading: false,
        notices: []
      };
      angular.copy(Model, vm.Model);
    }

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