(function() {
  'use strict';

  angular.module('app')
    .factory('GoogleMapModel', GoogleMapModel);

  GoogleMapModel.$inject = [];

  function GoogleMapModel() {

    var Model = {
      handle: 'google-map',
      loading: false,
      place: {}
    };

    return Model;
  }
})();
