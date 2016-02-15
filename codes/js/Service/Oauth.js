//====================================================
//  Usage
//====================================================
// function loginWithFacebook() {
//   return Oauth.facebook(FACEBOOK_KEY, ["email", "public_profile"])
//     .then(function() {
//       U.goToState('Main.Home', null, 'forward');
//     })
//     .catch(function(err) {
//       U.error(err);
//     });
// }

// function loginWithKakao() {
//   return Oauth.kakao(KAKAO_KEY)
//     .then(function() {
//       U.goToState('Main.Home', null, 'forward');
//     })
//     .catch(function(err) {
//       U.error(err);
//     });
// }

(function() {
  'use strict';

  angular.module('app')
    .factory('Oauth', Oauth);

  Oauth.$inject = [
    '$q', '$window', '$http', '$timeout',
    'Message', 'AppStorage',
    'OAUTH_CALLBACK_URL', 'SERVER_URL'
  ];

  function Oauth(
    $q, $window, $http, $timeout,
    Message, AppStorage,
    OAUTH_CALLBACK_URL, SERVER_URL
  ) {

    var Service = {
      facebook: facebook,
      kakao: kakao
    };

    return Service;

    function facebook(clientId, appScope, options) {
      Message.loading();
      var deferred = $q.defer();
      var redirect_uri = OAUTH_CALLBACK_URL;
      var flowUrl = "https://www.facebook.com/v2.0/dialog/oauth?client_id=" + clientId + "&redirect_uri=" + redirect_uri + "&response_type=token&scope=" + appScope.join(",");
      if (options !== undefined && options.hasOwnProperty("auth_type")) {
        flowUrl += "&auth_type=" + options.auth_type;
      }
      var success = false;
      var browserRef = $window.cordova.InAppBrowser.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,hidden=yes');

      browserRef.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
          success = true;
          browserRef.removeEventListener("exit", function() {});
          browserRef.close();
          var callbackResponse = (event.url).split("#")[1];
          var responseParameters = (callbackResponse).split("&");
          var parameterMap = [];
          for (var i = 0; i < responseParameters.length; i++) {
            parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
          }
          if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
            // Message.hide();
            deferred.resolve({
              access_token: parameterMap.access_token,
              expires_in: parameterMap.expires_in
            });
          } else {
            if ((event.url).indexOf("error_code=100") !== 0) {
              // Message.hide();
              deferred.reject("Facebook returned error_code=100: Invalid permissions");
            } else {
              // Message.hide();
              deferred.reject("Problem authenticating");
            }
          }
        }
      });

      browserRef.addEventListener('loadstop', function() {
        browserRef.show();
      });

      browserRef.addEventListener('exit', function() {
        if (!success) {
          // Message.hide();
          deferred.reject("The sign in flow was canceled");
        }
      });

      return deferred.promise
        .then(function(result) {
          result.provider = 'facebook';
          return $http({
            url: SERVER_URL + '/user/registerPassport',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: result
          });
        })
        .then(function(dataWrapper) {
          var userWrapper = dataWrapper.data;
          console.log("userWrapper :::\n", userWrapper);
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          return userWrapper;
        });
    }

    function kakao(clientId) {
      Message.loading();
      var deferred = $q.defer();
      var redirect_uri = OAUTH_CALLBACK_URL;
      var flowUrl = 'https://kauth.kakao.com/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&response_type=code';
      var browserRef = $window.cordova.InAppBrowser.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,hidden=yes');
      var success = false;

      browserRef.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
          success = true;
          browserRef.removeEventListener("exit", function() {});
          browserRef.close();
          var requestToken = (event.url).split("code=")[1];
          $http({
              method: "post",
              url: "https://kauth.kakao.com/oauth/token",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: "client_id=" + clientId + "&redirect_uri=" + redirect_uri +
                "&grant_type=authorization_code" + "&code=" + requestToken
            })
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function() {
              deferred.reject("Problem authenticating");
            });
        }
      });

      browserRef.addEventListener('loadstop', function() {
        browserRef.show();
      });

      browserRef.addEventListener('exit', function() {
        // Message.hide();
        if (!success) {
          deferred.reject("The sign in flow was canceled");
        }
      });
      return deferred.promise
        .then(function(result) {
          result.provider = 'kakao';
          console.log("result :::\n", result);
          return $http({
            url: SERVER_URL + '/user/registerPassport',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: result
          });
        }).then(function(dataWrapper) {
          var userWrapper = dataWrapper.data;
          console.log("userWrapper :::\n", userWrapper);
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          return userWrapper;
        });
    }
  }
})();
