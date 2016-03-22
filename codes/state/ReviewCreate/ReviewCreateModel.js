(function() {
  'use strict';

  angular.module('app')
    .factory('ReviewCreateModel', ReviewCreateModel);

  ReviewCreateModel.$inject = [];

  function ReviewCreateModel() {

    var Model = {
      handle: 'review-create',
      loading: false,
      review: {
        rating: 5,
        content: '',
        place: '',
        photos: []
      },
      images: [],
      tempFiles: [],
      files: [],
      create: [],
      destroy: []
    };

    return Model;
  }
})();
