(function() {
  'use strict';
  angular.module('app')
    .controller('SettingListController', SettingListController);

  SettingListController.$inject = [
    '$ionicHistory', '$scope', '$state',
    'SettingListModel', 'Util', 'Devices'
  ];

  function SettingListController(
    $ionicHistory, $scope, $state,
    SettingListModel, Util, Devices
  ) {
    // var initPromise;
    // var noLoadingStates = [];
    // var noResetStates = [];
    var vm = this;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    vm.Model = SettingListModel;
    vm.settingsToggle = settingsToggle;
    vm.togglePush = togglePush;
    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {}

    function onAfterEnter() {}

    //====================================================
    //  VM
    //====================================================

    function settingsToggle() {
      if (vm.Model.isSettingShow) {
        vm.Model.isSettingShow = false;
      } else {
        vm.Model.isSettingShow = true;
      }
    }

    function togglePush() {
      if (!Util.needLogin()) {
        vm.Model.settings.isPush = true;
        return false;
      }
      let devicePromise;
      if (vm.Model.settings.isPush) {
        devicePromise = Devices.pushOff(null, null).$promise;
      } else {
        devicePromise = Devices.pushOn(null, null).$promise;
      }
      return devicePromise
        .then(function(devicesWrapper) {
          console.log("devicesWrapper :::\n", devicesWrapper);
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

  }
})();