(function() {
  'use strict';

  angular.module('app')
    .factory('LoginModel', LoginModel);

  LoginModel.$inject = [];

  function LoginModel() {

    var Model = {
      handle: 'login',
      loading: false,

    };

    return Model;
  }
})();
