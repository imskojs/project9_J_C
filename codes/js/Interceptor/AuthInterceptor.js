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
      // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzcG9ydHMiOltdLCJyb2xlcyI6W3sibmFtZSI6IkFETUlOIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE2LTAzLTE0VDA2OjI4OjU3LjYyN1oiLCJ1cGRhdGVkQXQiOiIyMDE2LTAzLTE0VDA2OjI4OjU3LjYyN1oiLCJpZCI6IjU2ZTY1YTI5ZDM5MmM4NGQ5YWIxOTliNCJ9XSwicGVybWlzc2lvbnMiOltdLCJkZXZpY2VzIjpbXSwiZW1haWwiOiJkZXZlbG9wZXJAYXBwbGljYXQuY28ua3IiLCJ1c2VybmFtZSI6ImFkbWluIiwibmlja25hbWUiOiLqtIDrpqzsnpAiLCJjcmVhdGVkQXQiOiIyMDE2LTAzLTE0VDA2OjI4OjU5LjE4NloiLCJ1cGRhdGVkQXQiOiIyMDE2LTAzLTE0VDA2OjI5OjAwLjc5M1oiLCJvd25lciI6IjU2ZTY1YTJiZDM5MmM4NGQ5YWIxOWE1ZiIsImlkIjoiNTZlNjVhMmJkMzkyYzg0ZDlhYjE5YTVmIiwiaWF0IjoxNDU3OTM2OTg2LCJleHAiOjE0ODk0NzI5ODZ9.JGI7rQWEbu835gnlT4HuccAGDA25U-HA8scVdsnq4IY"
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
