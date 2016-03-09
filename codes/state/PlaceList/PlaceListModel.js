(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceListModel', PlaceListModel);

  PlaceListModel.$inject = [];

  function PlaceListModel() {

    var Model = {
      loading: false,
      places: [null],
      // premium: {
      //   places: [
      //   ]
      // },
      // special: {
      //   places: [
      //   ]
      // },
      // normal: {
      //   places: [
      //   ]
      // }

    };

    return Model;
  }
})();
