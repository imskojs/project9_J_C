(function() {
  'use strict';
  angular.module('app')
    .controller('EventTabController', EventTabController);

  EventTabController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q',
    'EventTabModel', 'Util', 'Events', 'RootScope'
  ];

  function EventTabController(
    _MockData,
    $ionicHistory, $scope, $q,
    EventTabModel, Util, Events, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.Footer.EventTab.JoodangEventList',
      'Main.Footer.EventTab.BarEventList'
    ];
    var vm = this;
    vm.Model = EventTabModel;
    vm.tabChange = tabChange;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        reset();
        Util.loading(EventTabModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {}

    function onBeforeLeave() {
      if (!Util.hasPreviousStates(noLoadingStates)) {}
    }


    //====================================================
    //  VM
    //====================================================

    function tabChange($event) {
      console.log("$event.currentTarget :::\n", $event.currentTarget);
      if ($event.currentTarget.textContent === '주당이벤트') {
        $event.currrentTarget.classList.add('positive positive-bb3px');

      }
      RootScope.goToState('Main.Footer.EventTab.JoodangEventList', {}, 'back');
      RootScope.goToState('Main.Footer.EventTab.BarEventList', {}, 'forward');
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {
      var Model = {
        handle: 'event-tab',
        loading: false,
        currentTab: '주당이벤트',
      };
      angular.copy(Model, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
  }
})();