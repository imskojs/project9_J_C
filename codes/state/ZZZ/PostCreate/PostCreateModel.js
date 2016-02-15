(function() {
  'use strict';

  angular.module('app')
    .factory('zPostCreateModel', zPostCreateModel);

  zPostCreateModel.$inject = [

  ];

  function zPostCreateModel(

  ) {

    var Model = {
      form: {
        title: '',
        content: ''
      }
    };

    return Model;
  }
})();
