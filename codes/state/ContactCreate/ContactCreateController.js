(function() {
  'use strict';
  angular.module('app')
    .controller('ContactCreateController', ContactCreateController);

  ContactCreateController.$inject = [
    '_MockData',
    '$scope', '$state',
    'ContactCreateModel', 'RootScope'
  ];  //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function ContactCreateController(
    _MockData,
    $scope, $state,
    ContactCreateModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ContactCreateModel;
    vm.contactCreate = contactCreate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

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

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {}

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================


    // 문의하기 버튼 클릭
    function contactCreate() {
      // implementation
      //1. Validation Check 진행
      console.log("vm.Model.email :::\n", vm.Model.email);
      console.log("vm.Model.phoneNumber :::\n", vm.Model.phoneNumber);
      console.log("vm.Model.title :::\n", vm.Model.title);
      console.log("vm.Model.content :::\n", vm.Model.content);
      //body에 붙여서 서버로 query를 보냄
      return RootScope.goToState('Main.Footer.SettingList', {}, 'forward');
    }
  }
})();
