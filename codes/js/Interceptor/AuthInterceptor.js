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
      var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzcG9ydHMiOltdLCJyb2xlcyI6W3sibmFtZSI6IkFETUlOIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE2LTAzLTA3VDA0OjM2OjAzLjExOFoiLCJ1cGRhdGVkQXQiOiIyMDE2LTAzLTA3VDA0OjM2OjAzLjExOFoiLCJpZCI6IjU2ZGQwNTMzYmM2NDRkZjk0MTJkNGQyYiJ9XSwicGVybWlzc2lvbnMiOltdLCJkZXZpY2VzIjpbXSwiZW1haWwiOiJkZXZlbG9wZXJAYXBwbGljYXQuY28ua3IiLCJ1c2VybmFtZSI6ImFkbWluIiwibmlja25hbWUiOiLqtIDrpqzsnpAiLCJjcmVhdGVkQXQiOiIyMDE2LTAzLTA3VDA0OjM2OjA0LjU0MloiLCJ1cGRhdGVkQXQiOiIyMDE2LTAzLTA3VDA0OjM2OjA2LjA2MVoiLCJvd25lciI6IjU2ZGQwNTM0YmM2NDRkZjk0MTJkNGRkOCIsImlkIjoiNTZkZDA1MzRiYzY0NGRmOTQxMmQ0ZGQ4IiwiaWF0IjoxNDU3Mzk5OTM2LCJleHAiOjE0ODg5MzU5MzZ9.brtanEcPPtpdoilpDJytxTwL6JB8SfAmYNMi5PY_EZ8";
      // var token = AppStorage.token;
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
