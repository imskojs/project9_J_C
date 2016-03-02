(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '$scope',
    '$ionicModal',
    'ProfileModel'
  ];

  function ProfileController(
    $scope,
    $ionicModal,
    ProfileModel
  ) {
    var Profile = this;
    Profile.Model = ProfileModel;


    //====================================================
    //  Implementation
    //====================================================

    $ionicModal.fromTemplateUrl("state/Profile/Modal/NicknameUpdateModal.html", {  //이 위치의 html내용을 모달로 사용
      scope: $scope,         //옵션1
      animation: 'mh-slide'  //옵션2
    }).then(function (modal) {  //콜백
      Profile.NicknameUpdateModal = modal;
    });

    Profile.NicknameUpdate = function() {
      //  Implementation
      Profile.NicknameUpdateModal.hide();
    };
  }
})();
