(function(angular) {
  'use strict';
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = [
    '$scope', '$state', '$ionicSideMenuDelegate', '$ionicModal',
    'MainModel', 'AppStorage'
  ];

  function MainController(
    $scope, $state, $ionicSideMenuDelegate, $ionicModal,
    MainModel, AppStorage
  ) {

    var Main = this;
    Main.Model = MainModel;

    Main.logout = logout;
    //====================================================
    //  Implementation
    //====================================================
    function logout(stateAfterLogout) {
      AppStorage = {
        isFirstTime: true
      };
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go(stateAfterLogout);
    }

    //====================================================
    //  Modal
    //====================================================
    // $ionicModal.fromTemplateUrl('state/Main/Modal/RequestLoginModal.html', {
    //   scope: $scope,
    //   animation: 'mh-slide'
    // }).then(function(modal) {
    //   Main.RequestLoginModal = modal;
    // });
  }
})(angular);
