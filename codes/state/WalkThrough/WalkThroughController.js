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
    function leaveWalkThrough(state) {
      AppStorage.firstTime = false;
      if (!state) {
        return Util.goToState('Login', null, 'forward');
      } else {
        return Util.goToState(state, null, 'forward');
      }
    }

  }
})();
