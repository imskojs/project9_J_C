(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceDetailModel', PlaceDetailModel);

  PlaceDetailModel.$inject = [];

  function PlaceDetailModel() {

    var Model = {
      loading: false,
      place: {},
    };

    return Model;
  }
})();