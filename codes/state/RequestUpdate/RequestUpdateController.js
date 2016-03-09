(function() {
  'use strict';
  angular.module('app')
    .controller('RequestUpdateController', RequestUpdateController);

  RequestUpdateController.$inject = [
    '_MockData',
    '$scope', '$state',
    'RequestUpdateModel', 'Util', 'RootScope'
  ];  //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function RequestUpdateController(
    _MockData,
    $scope, $state,
    RequestUpdateModel, Util, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = RequestUpdateModel;
    vm.checkBox = checkBox;
    vm.requestUpdate = requestUpdate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(RequestUpdateModel);
        // initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params.placeId :::\n", $state.params.placeId);
    }

    function onAfterEnter() {
      // initPromise
      //   .then(place => {    //{id: 1300, name: 'asda' ... }
      //     Util.bindData(place, RequestUpdateModel, 'place');  //Model['place'] = place
      //   })
      vm.Model.update.place.id = _MockData.findOne($state.params.placeId);
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  VM
    //====================================================

    function getAverageRating (num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i=0; i<roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    //체크박스 클릭
    function checkBox (modelObj, attr) {
      switch (modelObj[attr]) {
        case true : modelObj[attr] = false; return;
        case false: modelObj[attr] = true; return;
      }
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {
      vm.Model.update.place = {id: ''};
      vm.Model.update.infomation = false;
      vm.Model.update.menuAndPrice = false;
      vm.Model.update.eventAndDiscount = false;
      vm.Model.update.stateChange = false;
      vm.Model.update.other = false;
      vm.Model.update.detail = '';
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function requestUpdate () {
      var form = vm.Model.update;
      console.log("form :::\n", form);
      //업체 또는 주당본사에 메일보내는 로직
      return RootScope.goToState('Main.PlaceDetail', {placeId: form.place.id}, 'forward');
    }
  }
})();
