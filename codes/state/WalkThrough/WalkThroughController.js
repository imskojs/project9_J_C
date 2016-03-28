(function() {
  'use strict';
  angular.module('app')
    .controller('WalkThroughController', WalkThroughController);

  WalkThroughController.$inject = [
    '$scope', '$ionicSlideBoxDelegate', '$window', '$state', '$ionicGesture',
    'WalkThroughModel', 'AppStorage', 'Util'
  ];

  function WalkThroughController(
    $scope, $ionicSlideBoxDelegate, $window, $state, $ionicGesture,
    WalkThroughModel, AppStorage, Util
  ) {

    var vm = this;
    vm.Model = WalkThroughModel;

    vm.leaveWalkThrough = leaveWalkThrough;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.enter', onEnter);

    //====================================================
    // View Events
    //====================================================

    function onBeforeEnter() {
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').update();
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').slide(0, 0);
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').enableSlide(true);
    }

    function onEnter() {
      var lastSlideIndex = vm.Model.imagePaths.length - 1;
      var lastSlideElement = angular.element($window.document.querySelector('#slide' + lastSlideIndex));
      $ionicGesture.on('swipeleft', leaveWalkThrough, lastSlideElement);
    }
    //====================================================
    //  VM
    //====================================================
    //====================================================
    // Private
    //====================================================
    function leaveWalkThrough() {
      AppStorage.isFirstTime = false;  //작업완료되면 false로
      return Util.goToState('Main.Footer.Home', null, 'forward');
    }

  }
})();
