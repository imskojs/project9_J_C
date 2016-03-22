(function() {
  'use strict';

  angular.module('app')
    .factory('FavoriteListModel', FavoriteListModel);

  FavoriteListModel.$inject = [];

  function FavoriteListModel() {

    var Model = {
      handle: 'favorite-list',
      loading: false,
      longitude: 126,
      latitude: 37,
      places: []
    };

    return Model;
  }
})();
