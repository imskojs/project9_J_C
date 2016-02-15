(function() {
  'use strict';

  angular.module('app')
    .factory('zProfileModel', zProfileModel);

  zProfileModel.$inject = [];

  function zProfileModel() {

    var model = {
      form: {
        files: [],
        name: '',
        nickname: ''
      }
    };

    return model;
  }
})();
