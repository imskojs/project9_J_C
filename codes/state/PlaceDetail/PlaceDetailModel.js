(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceDetailModel', PlaceDetailModel);

  PlaceDetailModel.$inject = [];

  function PlaceDetailModel() {

    var Model = {
      handle: 'place-detail',
      loading: false,
      isNotFavorite: true,

      loadingById: [],
      commentDestroyLoading: false,
      place: {},
      reviews: [],
      comments: [],
    };

    return Model;
  }
})();
