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
      'ngAnimate',
      // "ui.bootstrap.tpls",
      // "ui.bootstrap.datepicker"
    ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state', '$timeout',
    'RootScope', 'Preload', 'PushService',
    'DEV_MODE', 'Assets', 'BackButton'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state, $timeout,
    RootScope, Preload, PushService,
    DEV_MODE, Assets, BackButton
  ) {
    Preload.assets(Assets);
    angular.extend($rootScope, RootScope);

    if (DEV_MODE) {
      setInitialState();
    }

    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        // PushService.registerDevice();
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        PushService.registerDevice(); //디바이스의 id를 등록
        BackButton.register();
      }
      if ($window.StatusBar) {
        // $window.StatusBar.styleDefault();
        $window.StatusBar.backgroundColorByHexString("#9b2142");
        //안드로이드 5.0 이상에서만 작동
      }
      setInitialState();
      if ($window.cordova) {
        $timeout(function() {
          $window.navigator.splashscreen.hide();
        }, 300);
      }
    }
    //====================================================
    //  Helper
    //====================================================
    function setInitialState() {
      if ($rootScope.AppStorage.isFirstTime && $state.get('WalkThrough')) {
        // First time user logic
        $state.go('WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        $state.go('Main.Footer.Home');
      } else {
        // Normal user logic
        // $state.go('Main.Home');
        $state.go('Main.Footer.Home');
      }
    }

  }
})(angular);