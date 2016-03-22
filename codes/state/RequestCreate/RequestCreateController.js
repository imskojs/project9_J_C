(function() {
  'use strict';
  angular.module('app')
    .controller('RequestCreateController', RequestCreateController);

  RequestCreateController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state',
    'RequestCreateModel', 'RootScope'
  ]; //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function RequestCreateController(
    _MockData,
    $ionicHistory, $scope, $state,
    RequestCreateModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = RequestCreateModel;
    vm.requestCreate = requestCreate;

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
      //     // RequestCreateModel.premium.places = premiumPlacesWrapper.places;
      //     // RequestCreateModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, RequestCreateModel.normal, 'places');
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
    function requestCreate() {
      // implementation
      //1. Validation Check 진행
      console.log("vm.Model.placeName :::\n", vm.Model.placeName);
      console.log("vm.Model.placeNumber :::\n", vm.Model.placeNumber);
      console.log("vm.Model.location :::\n", vm.Model.location);
      console.log("vm.Model.name :::\n", vm.Model.name);
      console.log("vm.Model.phoneNumber :::\n", vm.Model.phoneNumber);
      console.log("vm.Model.title :::\n", vm.Model.title);
      console.log("vm.Model.content :::\n", vm.Model.content);
      //body에 붙여서 서버로 query를 보냄
      return RootScope.goToState('Main.Footer.SettingList', {}, 'forward');
    }
  }
})();