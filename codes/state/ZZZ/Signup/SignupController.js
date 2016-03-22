(function() {
  'use strict';
  angular.module('app')
    .controller('zSignupController', zSignupController);

  zSignupController.$inject = [
    '$scope', '$timeout',
    'zSignupModel', 'Photo', 'Users', 'Util', 'Message', 'Dom'
  ];

  function zSignupController(
    $scope, $timeout,
    zSignupModel, Photo, Users, Util, Message, Dom
  ) {

    var Signup = this;
    Signup.Model = zSignupModel;

    Signup.getPicture = getPicture;
    Signup.register = register;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      Util.freeze(false);
    }

    //====================================================
    //  Implementation
    //====================================================
    function getPicture() {
      zSignupModel.imgLoading = true;
      return Photo.get('gallery', 800, true, 300, 'square', 1)
        .then(function(base64) {
          zSignupModel.form.files = [];
          zSignupModel.form.files[0] = base64;
          $timeout(function() {
            zSignupModel.imgLoading = false;
          }, 2000);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function register() {
      if (!validate()) {
        return false;
      }
      Message.loading();
      zSignupModel.form.username = zSignupModel.form.email;
      return userRegister()
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          Message.alert('회원가입 알림', '회원가입을 성공적으로 하셨습니다.');
        })
        .then(function() {
          Util.goToState('zLogin', null, 'back');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function validate() {
      var alerty = Message.alert.bind(Message, '회원가입 알림');
      var form = zSignupModel.form;
      if (zSignupModel.form.files.length === 0) {
        alerty('사진을 등록해주세요');
        return false;
      } else if (!form.name) {
        alerty('이름을 입력해주세요')
          .then(function() {
            Dom.focusById('name');
          });
        return false;
      } else if (!form.nickname) {
        alerty('별명을 입력해주세요')
          .then(function() {
            Dom.focusById('nickname');
          });
        return false;
      } else if (!form.email) {
        alerty('이메일을 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else if (form.password !== zSignupModel.confirmPassword) {
        alerty('비밀번호를 동일하게 입력해주세요')
          .then(function() {
            Dom.focusById('password');
          });
        return false;
      } else if (!validateEmail(form.email)) {
        alerty('이메일이 아닙니다, 다시 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else if (!zSignupModel.agree) {
        alerty('이용약관을 동의 해주시기 바랍니다');
        return false;
      } else {
        return true;
      }
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    //====================================================
    //  REST
    //====================================================
    function userRegister() {
      var form = zSignupModel.form;
      return Users
        .register({}, {
          files: form.files,
          name: form.name,
          nickname: form.nickname,
          email: form.email,
          username: form.username,
          password: form.password
        }).$promise
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
    }

  }
})();