(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceListModel', PlaceListModel);

  PlaceListModel.$inject = [];

  function PlaceListModel() {

    var Model = {
      loading: false,
      longitude: 126,
      latitude: 37,
      PREMIUM: {
        places: [],
        buttonLoading: false
      },
      SPECIAL: {
        places: [],
        buttonLoading: false
      },
      NORMAL: {
        places: [],
        buttonLoading: false
      }

    };

    return Model;
  }
})();
