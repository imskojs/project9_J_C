(function() {
  'use strict';
  angular.module('app')
    .controller('ContactCreateController', ContactCreateController);

  ContactCreateController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state', '$window',
    'ContactCreateModel', 'RootScope', 'Users', 'Util'
  ]; //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function ContactCreateController(
    _MockData,
    $ionicHistory, $scope, $state, $window,
    ContactCreateModel, RootScope, Users, Util
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = ContactCreateModel;
    var resetModel = Util.getResetModel(vm.Model);

    vm.contactCreate = contactCreate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.afterLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params.keywords :::\n", $state.params.keywords);
      console.log("$state.params.keywordString :::\n", $state.params.keywordString);
      // initPromise = init();
    }

    function onAfterEnter() {
      // initPromise
      //   .then((array) => {
      //     let premiumPlacesWrapper = array[0];
      //     let specialPlacesWrapper = array[1];
      //     let normalPlacesWrapper = array[2];
      //     // ContactCreateModel.premium.places = premiumPlacesWrapper.places;
      //     // ContactCreateModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, ContactCreateModel.normal, 'places');
      //   })
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noLoadingStates.indexOf(nextState.name) === -1
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

    function init() {}

    function reset() {
      angular.copy(resetModel, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================


    // 문의하기 버튼 클릭
    function contactCreate() {
      vm.Model.sendEmail.title = $window.document.getElementsByClassName('zero')[0].textContent;
      vm.Model.sendEmail.type = $window.document.getElementsByClassName('zero')[0].textContent;

      var queryWrapper = {
        query: vm.Model.sendEmail
      };
      return Users.sendEmail(null, queryWrapper).$promise
        .then(arrayWrapper => {
          console.log("arrayWrapper :::\n", arrayWrapper);
          Message.alert('알림', '문의내용을 성공적으로 전송하였습니다.');
          return RootScope.goToState('Main.Footer.SettingList', {}, 'forward');
        })
        .catch((err) => {
          return Util.error(err);
        });
    }
  }
})();