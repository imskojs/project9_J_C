(function() {
  'use strict';
  angular.module('app')
    .controller('SettingListController', SettingListController);

  SettingListController.$inject = [
    '$ionicHistory', '$scope', '$state',
    'SettingListModel', 'Util', 'Devices', 'AppStorage'
  ];

  function SettingListController(
    $ionicHistory, $scope, $state,
    SettingListModel, Util, Devices, AppStorage
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

    function onBeforeEnter() {
      vm.Model.settings.isPush = AppStorage.devices[0].active;
    }

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
      console.log("vm.Model.settings.isPush :::\n", vm.Model.settings.isPush);
      if (!vm.Model.settings.isPush) {
        devicePromise = Devices.pushOff(null, null).$promise

      } else {
        devicePromise = Devices.pushOn(null, null).$promise;
      }
      return devicePromise
        .then(function(devicesWrapper) {
          console.log("devicesWrapper :::\n", devicesWrapper);
          AppStorage.devices = devicesWrapper.devices;  //devicesWrapper.devices[0].active == true 푸시 메세지 옴
          vm.Model.settings.isPush = AppStorage.devices[0].active;
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