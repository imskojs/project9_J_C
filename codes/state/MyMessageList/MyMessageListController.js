(function() {
  'use strict';
  angular.module('app')
    .controller('MyMessageListController', MyMessageListController);

  MyMessageListController.$inject = [
    '$scope', '$state', '$ionicHistory',
    'MyMessageListModel', 'Util', 'Messages', 'AppStorage'
  ];

  function MyMessageListController(
    $scope, $state, $ionicHistory,
    MyMessageListModel, Util, Messages, AppStorage
  ) {
    // var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = MyMessageListModel;
    vm.infiniteScroll = infiniteScroll;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((messagesWrapper) => {
            console.log("messagesWrapper :::\n", messagesWrapper);
            return Util.bindData(messagesWrapper, vm.Model, 'messages');
          })
          .then(() => {
            console.log("vm.Model -- MyMessageList --:::\n", vm.Model);
          })
          .catch((err) => {
            Util.error(err);
          });
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

    function infiniteScroll() {
      var last = vm.Model.posts.length - 1;
      var searchObj = {
        owner: AppStorage.user.id,
        id: {
          '<': vm.Model.posts[last].id,
        },
      };
      return messageFindUnique()
        .then(function(messagesWrapper) {
          return Util.appendData(messagesWrapper, vm.Model, 'messages');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================
    function init() {
      return messageFindUnique()
        .then((messagesWrapper) => {
          return messagesWrapper;
        });
    }

    function reset() {
      let defaultObj = {
        loading: false,
        messages: [],
      };
      angular.copy(defaultObj, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function messageFindUnique(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {
            receiver: AppStorage.user.id
          },
          sort: 'id DESC'
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Messages.findUnique(queryWrapper).$promise
        .then((placeList) => {
          return placeList;
        });
    }
  }
})();