(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '_MockData',
    'LoginModel', 'Message', 'Users', 'AppStorage', 'Oauth', 'Util',
    'KAKAO_KEY', 'FACEBOOK_KEY'
  ];

  function LoginController(
    _MockData,
    LoginModel, Message, Users, AppStorage, Oauth, Util,
    KAKAO_KEY, FACEBOOK_KEY
  ) {
    var vm = this;
    vm.Model = LoginModel;

    vm.loginWithKakao = loginWithKakao;
    vm.loginWithFacebook = loginWithFacebook;
    //====================================================
    //  View Event
    //====================================================


    //====================================================
    //  VM
    //====================================================

    function loginWithKakao() {
      return Oauth.kakao(KAKAO_KEY)
        .then((userWrapper) => {
          console.log("userWrapper :::\n", userWrapper);
          Util.goToState('Main.Footer.Home', {}, 'forward');
        })
        .catch((err) => {
          console.log("err :::\n", err);
          Util.error(err);
        });
    }

    function loginWithFacebook() {
      return Oauth.facebook(FACEBOOK_KEY, ["email", "public_profile"])
        .then((userWrapper) => {
          console.log("userWrapper :::\n", userWrapper);
          Util.goToState('Main.Footer.Home', {}, 'forward');
        })
        .catch((err) => {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
    function oauthKakao() {
      return Oauth.kakao(KAKAO_KEY)
        .then((userWrapper) => {
          return userWrapper;
        });
    }

  }
})();

// function localLogin() {
//   Message.loading();
//   return Users.login({}, LoginModel.form).$promise //promise에서는 반드시 return
//     .then((userWrapper) => {
//       Message.hide();
//       console.log("userWrapper :::\n", userWrapper);
//       AppStorage.user = userWrapper.user; //로그인정보
//       AppStorage.token = userWrapper.token; //해당 기기에 대한 권한
//       AppStorage.isFirstTime = false; //첫 튜토리얼 마쳤다는 의미
//       Util.goToState('Main.SettingList', {}, 'forward');
//     })
//     .catch((err) => {
//       console.log("err :::\n", err);
//       if (err.status === 403) {
//         return Message.alert('로그인 알림', '비밀번호/이메일이 틀렸습니다. 다시 입력해주세요.');
//       } else {
//         return Message.alert();
//       }
//     });
// }
