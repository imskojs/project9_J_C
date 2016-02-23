(function() {
  'use strict';

  angular.module('app')
    .factory('zLoginModel', zLoginModel);

  zLoginModel.$inject = [];

  function zLoginModel() {

    var model = {
      form: {
        identifier: null,
        password: null
      }
    };
    return model;

  }
})();
