(function() {
  'use strict';
  angular.module('app')
    .controller('CompanyCreateController', CompanyCreateController);

  CompanyCreateController.$inject = [
    '_MockData',
    '$scope', '$state',
    'CompanyCreateModel', 'RootScope'
  ];  //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function CompanyCreateController(
    _MockData,
    $scope, $state,
    CompanyCreateModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = CompanyCreateModel;
    vm.companyCreate = companyCreate;

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
      //     // CompanyCreateModel.premium.places = premiumPlacesWrapper.places;
      //     // CompanyCreateModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, CompanyCreateModel.normal, 'places');
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
    function companyCreate() {
      // implementation
      //1. Validation Check 진행
      console.log("vm.Model.placeName :::\n", vm.Model.placeName);
      console.log("vm.Model.phoneNumber :::\n", vm.Model.phoneNumber);
      console.log("vm.Model.location :::\n", vm.Model.location);
      console.log("vm.Model.title :::\n", vm.Model.title);
      console.log("vm.Model.content :::\n", vm.Model.content);
      //body에 붙여서 서버로 query를 보냄
      return RootScope.goToState('Main.Footer.SettingList', {}, 'forward');
    }
  }
})();
