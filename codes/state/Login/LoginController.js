(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    'LoginModel', 'Message', 'Users', 'AppStorage', 'Oauth', 'Util',
    'KAKAO_KEY', 'FACEBOOK_KEY'
  ];

  function LoginController(
    LoginModel, Message, Users, AppStorage, Oauth, Util,
    KAKAO_KEY, FACEBOOK_KEY
  ) {
    var Login = this;
    Login.Model = LoginModel;

    Login.localLogin = localLogin;
    Login.loginWithKakao = loginWithKakao;
    Login.loginWithFacebook = loginWithFacebook;


    //====================================================
    //  Implementation
    //====================================================


    function localLogin() {
      Message.loading();
      Users.login({}, LoginModel.form).$promise
        .then(function(userWrapper) {
          Message.hide();
          console.log("----------userWrapper---------");
          console.log(userWrapper);
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          Util.goToState('Main.SettingList', {}, 'forward');
        })
        .catch(function(err) {
          console.log('---------------err-----------');
          console.log(err);
          if (err.status === 403) {
            return Message.alert('로그인 알림', '비밀번호/이메일이 틀렸습니다. 다시 입력해주세요.');
          } else {
            return Message.alert();
          }
        });
    };

    function loginWithKakao() {
      return Oauth.kakao(KAKAO_KEY)
        .then(function() {
          Util.goToState('Main.SettingList', {}, 'forward');
        })
        .catch(function(err) {
          Util.error(err);
        });
    };

    function loginWithFacebook() {
      return Oauth.facebook(1009847152386966, ["email", "public_profile"])  //1009847152386966, FACEBOOK_KEY
        .then(function() {
          Util.goToState('Main.SettingList', {}, 'forward');
        })
        .catch(function(err) {
          Util.error(err);
        });
    };
  }
})();