(function() {
  'use strict';

  angular.module('app')
    .factory('ReviewCreateModel', ReviewCreateModel);

  ReviewCreateModel.$inject = [];

  function ReviewCreateModel() {

    var Model = {
      loading: false,
      review: {
        rating: 0,
        content: '',
        place: { id: '' },
        photos: []  //{name, url}
      }
    };

    return Model;
  }
})();
