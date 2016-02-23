(function() {
  'use strict';

  angular.module('app')
    .factory('zLoginModel', LoginModel);

  LoginModel.$inject = [];

  function LoginModel() {

    var model = {
      form: {
        identifier: null,
        password: null
      }
    };
    return model;

  }
})();
