(function() {
  'use strict';

  angular.module('app')
    .factory('JoodangEventDetailModel', JoodangEventDetailModel);

  JoodangEventDetailModel.$inject = [];

  function JoodangEventDetailModel() {

    var Model = {
      loading: false,
      events: []
    };

    return Model;
  }
})();
