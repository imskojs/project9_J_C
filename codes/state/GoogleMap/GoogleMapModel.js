(function() {
  'use strict';

  angular.module('app')
    .factory('GoogleMapModel', GoogleMapModel);

  GoogleMapModel.$inject = [];

  function GoogleMapModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
