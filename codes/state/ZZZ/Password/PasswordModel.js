(function() {
  'use strict';

  angular.module('app')
    .factory('zPasswordModel', zPasswordModel);

  zPasswordModel.$inject = [];

  function zPasswordModel() {

    var Model = {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      newPasswordConfirm: ''
    };

    return Model;
  }
})();
