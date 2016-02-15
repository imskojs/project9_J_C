(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitUpdateModel', PostFitUpdateModel);

  PostFitUpdateModel.$inject = [];

  function PostFitUpdateModel() {

    var Model = {
      form: {}
    };

    return Model;
  }
})();
