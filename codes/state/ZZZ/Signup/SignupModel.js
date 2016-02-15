(function() {
  'use strict';

  angular.module('app')
    .factory('zSignupModel', zSignupModel);

  zSignupModel.$inject = [];

  function zSignupModel() {

    var Model = {
      imgLoading: false,
      form: {
        files: [],
        name: '',
        nickname: '',
        email: '',
        username: '',
        password: ''
      },
      confirmPassword: null,
      agree: false
    };

    return Model;

  }
})();
