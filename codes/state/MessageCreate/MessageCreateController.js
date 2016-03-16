(function() {
  'use strict';
  angular.module('app')
    .controller('MessageCreateController', MessageCreateController);

  MessageCreateController.$inject = [
    '$scope', '$state', '$window',
    'MessageCreateModel', 'Util', 'AppStorage', 'Messages'
  ];

  function MessageCreateController(
    $scope, $state, $window,
    MessageCreateModel, Util, AppStorage, Messages
  ) {
    var _ = $window._;
    var moment = $window.moment;
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = MessageCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    vm.getAverageRating = getAverageRating;
    vm.create = create;

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
            _.reduce(messagesWrapper.messages, dayBreaker, null);
            return Util.bindData(messagesWrapper, vm.Model, 'messages');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
          })
          .catch((err) => {
            Util.error(err);
          });
      } else {
        Util.freeze(false);
      }

    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  VM
    //====================================================

    function getAverageRating(num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i = 0; i < roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    function create() {
      Message.loading();
      return messageCreate()
        .then((messagesWrapper) => {
          _.reduce(messagesWrapper.messages, dayBreaker, null);
          return Util.bindData(messagesWrapper, vm.Model, 'messages');
        })
        .then(() => {
          Message.alert('메세지 쓰기 알림', '메세지가 전송 되었습니다.');
        })
        .catch((err) => {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() {
      return messageFind()
        .then((messagesWrapper) => {
          return messagesWrapper;
        });
    }

    function reset() {
      let defaultObj = {
        loading: false,
        // [{dayBreaker: true}, {dayBreaker: false}]
        messages: [],
        message: {
          sender: '',
          receiver: '',
          content: ''
        }
      };
      angular.copy(defaultObj, vm.Model);
    }

    function dayBreaker(message1, message2) {
      if (!message1) {
        return message2;
      }
      var moment1 = moment(message1.createdAt);
      var moment2 = moment(message2.createdAt);
      var year1 = moment1.year();
      var month1 = moment1.month();
      var date1 = moment1.day();
      var year2 = moment2.year();
      var month2 = moment2.month();
      var date2 = moment2.day();
      if (year1 !== year2) {
        message2.dayBreaker = true;
      } else if (month1 !== month2) {
        message2.dayBreaker = true;
      } else if (date1 !== date2) {
        message2.dayBreaker = true;
      } else {
        message2.dayBreaker = false;
      }
      return message2;
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function messageFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {
            or: [{
              sender: $state.params.ownerId,
              receiver: AppStorage.user.id
            }, {
              receiver: $state.params.ownerId,
              sender: AppStorage.user.id
            }]
          },
          sort: 'id ASC',
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Messages.find(queryWrapper).$promise
        .then(messagesWrapper => {
          return messagesWrapper;
        });
    }

    function messageCreate(extraQuery) {
      vm.Model.message.sender = AppStorage.user.id;
      vm.Model.message.receiver = $state.params.ownerId;
      let queryWrapper = {
        query: vm.Model.message
      };

      angular.extend(queryWrapper.query, extraQuery);
      return Messages.create(queryWrapper).$promise
        .then(messagesWrapper => {
          return messagesWrapper; // all messages
        });
    }


  }
})();
