(function() {
  'use strict';
  angular.module('app')
    .controller('zPasswordController', zPasswordController);

  zPasswordController.$inject = [
    '$scope',
    'zPasswordModel', 'Users', 'Message', 'U'
  ];

  function zPasswordController(
    $scope,
    zPasswordModel, Users, Message, U
  ) {
    var Password = this;
    Password.Model = zPasswordModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    Password.sendForm = sendForm;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      U.freeze(false);
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      if (!validate()) {
        return Message.alert('비밀번호 변경 알림', '새로운 비밀번호와 재입력한 비밀번호가 다릅니다.');
      }
      return userChangePassword()
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          return Message.alert('비밀번호 변경 알림', data.message);
        })
        .then(function() {
          reset();
          U.goBack();
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert('비밀번호 변경 알림', err.data.message);
          reset();
        });
    }


    //====================================================
    //  Helper
    //====================================================
    function validate() {
      if (zPasswordModel.form.newPassword !== zPasswordModel.newPasswordConfirm) {
        return false;
      } else if (true /*more logic*/ ) {
        // return false;
      }

      return true;
    }

    function reset() {
      zPasswordModel.form.oldPassword = '';
      zPasswordModel.form.newPassword = '';
      zPasswordModel.newPasswordConfirm = '';
    }

    //====================================================
    //  REST
    //====================================================
    function userChangePassword() {
      return Users.changePassword({
        oldPassword: zPasswordModel.form.oldPassword,
        newPassword: zPasswordModel.form.newPassword
      }).$promise;
    }
  }
})();
