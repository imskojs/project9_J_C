(function() {
  'use strict';
  angular.module('app')
    .controller('zProfileController', zProfileController);

  zProfileController.$inject = [
    '$scope', '$timeout',
    'zProfileModel', 'Users', 'AppStorage', 'U', 'Photo', 'Message'
  ];

  function zProfileController(
    $scope, $timeout,
    zProfileModel, Users, AppStorage, U, Photo, Message
  ) {
    var Profile = this;
    Profile.Model = zProfileModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    Profile.getPhoto = getPhoto;
    Profile.sendForm = sendForm;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      U.freeze(false);
    }

    function onAfterEnter() {
      return userFindOne()
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          $timeout(function() {
            AppStorage.user = user;
            zProfileModel.form = user;
            console.log("---------- zProfileModel.form ----------");
            console.log(zProfileModel.form);
          }, 0);
        })
        .catch(function(err) {
          return U.error(err);
        });

    }
    //====================================================
    //  Implementation
    //====================================================

    function getPhoto() {
      return Photo.get('gallery', 600, true, 300, 'square', 1)
        .then(function(base64) {
          zProfileModel.form.files = [base64];
        })
        .catch(function(err) {
          console.log("---------- err.data.message === cancelled ----------");
          console.log(err.data.message);
          // U.error(err);
        });
    }

    function sendForm() {
      Message.loading();
      userUpdate()
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          Message.hide();
          return Message.alert('프로필 변경 알림.', '프로필을 성공적으로 변경하였습니다.');
        })
        .then(function() {
          U.goBack();

        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.hide();
          Message.alert();
        });
    }


    //====================================================
    //  REST
    //====================================================
    function userFindOne() {
      return Users.findOne({
        id: AppStorage.user.id
      }).$promise;
    }

    function userUpdate() {
      return Users.update({}, {
        files: zProfileModel.form.files,
        name: zProfileModel.form.name,
        nickname: zProfileModel.form.nickname
      }).$promise;
    }

  }
})();
