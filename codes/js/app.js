(function(angular) {
  'use strict';
  angular.module('app', [
      'ionic',
      'applicat.push.service',
      'ngCordova',
      'ngResource',
      'ngFileUpload',
      'ngTemplates',
      'ngStorage',
      'ngImgCrop',
      // "ui.bootstrap.tpls",
      // "ui.bootstrap.datepicker"
    ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state',
    'RootScope', 'Preload', 'PushService',
    'DEV_MODE', 'Assets'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, Preload, PushService,
    DEV_MODE, Assets
  ) {

    Preload.assets(Assets);
    angular.extend($rootScope, RootScope);

    // setInitialState();
    $state.go('Main.ProvinceSearchList');

    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        // PushService.registerDevice();
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if ($window.StatusBar) {
        $window.StatusBar.styleDefault();
      }
      setInitialState();
    }
    //====================================================
    //  Helper
    //====================================================
    function setInitialState() {
      if ($rootScope.AppStorage.isFirstTime && $state.get('Main.WalkThrough')) {
        // First time user logic
        $state.go('Main.WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        // $state.go('Main.Home');
        // $state.go('Main.Home');
      } else {
        // Normal user logic
        // $state.go('Main.Home');
        $state.go('Main.zPostList');
      }
    }

  }
})(angular);
