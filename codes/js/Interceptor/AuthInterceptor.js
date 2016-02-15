// Set authorization header(token based), if in dev mode use Admin token
//by logging in through admin page and copy past in `adminTOKEN`;
(function(angular) {
  'use strict';
  angular.module('app')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['AppStorage'];

  function AuthInterceptor(AppStorage) {

    var interceptor = {
      request: request
    };

    return interceptor;

    function request(req) {
      var token = AppStorage.token;
      if (token) {
        if (req.headers.enctype && req.headers.enctype.includes('multipart/form-data')) {
          console.log("---------- 'req.headers.enctype.includes multipart/form-date AuthInterceptor' ----------");
        } else {
          req.headers['Content-Type'] = 'application/json';
        }
        req.headers.Authorization = 'Bearer ' + token;
      }
      return req;
    }

  }
})(angular);
