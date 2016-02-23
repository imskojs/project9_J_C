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
    'DEV_MODE', 'Assets', 'BackButton'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, Preload, PushService,
    DEV_MODE, Assets, BackButton
  ) {

    Preload.assets(Assets);
    angular.extend($rootScope, RootScope);

    // setInitialState();
    // $state.go('Main.Footer.Home');
    $state.go('Main.Footer.Home');

    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        // PushService.registerDevice();
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        BackButton.register();
      }
      if ($window.StatusBar) {
        // $window.StatusBar.styleDefault();
        $window.StatusBar.backgroundColorByHexString("#9b2142");
        //안드로이드 5.0 이상에서만 작동
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
