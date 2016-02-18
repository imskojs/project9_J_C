(function() {
  'use strict';
  angular.module('app')
    .controller('TalkDetailController', TalkDetailController);

  TalkDetailController.$inject = [
    '$scope',
    '$ionicModal',
    'TalkDetailModel'
  ];

  function TalkDetailController(
    $scope,
    $ionicModal,
    TalkDetailModel
  ) {
    var TalkDetail = this;
    TalkDetail.Model = TalkDetailModel;

    $ionicModal.fromTemplateUrl('state/TalkDetail/Modal/ConfirmModal.html', {
      scope: $scope,
      animation: 'mh-slide'
    }).then(function(modal) {
      TalkDetail.ConfirmModal = modal;

    });

    TalkDetail.openModal = function() {
      console.log("111111");
       TalkDetail.ConfirmModal.show();
    };
    TalkDetail.closeModal = function() {
      console.log("22222222");
      TalkDetail.ConfirmModal.hide();
    };

    //====================================================
    //  Implementation
    //====================================================
  }
})();
