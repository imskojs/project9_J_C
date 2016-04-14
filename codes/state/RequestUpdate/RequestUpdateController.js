(function() {
  'use strict';
  angular.module('app')
    .controller('RequestUpdateController', RequestUpdateController);

  RequestUpdateController.$inject = [
    '$ionicHistory', '$scope', '$state', '$window',
    'RequestUpdateModel', 'Util', 'RootScope', 'Users', 'Message'
  ]; //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function RequestUpdateController(
    $ionicHistory, $scope, $state, $window,
    RequestUpdateModel, Util, RootScope, Users, Message
  ) {
    // var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = RequestUpdateModel;
    vm.checkBox = checkBox;
    vm.requestUpdate = requestUpdate;

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
        // initPromise = init();
      }
      vm.Model.sendEmail.placeName = $state.params.placeName;
    }

    function onAfterEnter() {
      // initPromise
      //   .then(place => {    //{id: 1300, name: 'asda' ... }
      //     Util.bindData(place, RequestUpdateModel, 'place');  //Model['place'] = place
      //   })
      // vm.Model.sendEmail.options.placeId = _MockData.findOne($state.params.placeId);
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

    //체크박스 클릭
    function checkBox(modelObj, attr, data) {
      if (modelObj[attr]) {
        modelObj[attr] = '';
      } else {
        modelObj[attr] = data;
      }
    }

    //====================================================
    //  Private
    //====================================================

    // function init() {}

    function reset() {
      var Model = {
        handle: 'request-update',
        loading: false,
        sendEmail: {
          type: '', //Not Null
          email: '',
          contact: '',
          title: '',
          content: '',
          placeName: '',
          placeContact: '',
          location: '',
          userName: '',
          userContact: '',
          options: {
            placeId: '',
            infomation: '',
            menuAndPrice: '',
            eventAndDiscount: '',
            stateChange: '',
            other: '',
          }
        }
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function requestUpdate() {
      vm.Model.sendEmail.type = $window.document.getElementsByClassName('zero')[0].textContent;
      vm.Model.sendEmail.placeName = $state.params.placeName;
      vm.Model.sendEmail.options.placeId = $state.params.placeId;
      console.log("vm.Model :::\n", vm.Model);

      var queryWrapper = {
        query: vm.Model.sendEmail
      };
      return Users.sendEmail(null, queryWrapper).$promise
        .then(arrayWrapper => {
          console.log("arrayWrapper :::\n", arrayWrapper);
          Message.alert('알림', '수정요청을 성공적으로 전송하였습니다.');
          return RootScope.goToState('Main.PlaceDetail', { placeId: $state.params.placeId }, 'forward');
        })
        .catch((err) => {
          return Util.error(err);
        });
      //업체 또는 주당본사에 메일보내는 로직

    }
  }
})();