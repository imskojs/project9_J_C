(function() {
  'use strict';

  angular.module('app')
    .factory('zPostDetailModel', zPostDetailModel);

  zPostDetailModel.$inject = [

  ];

  function zPostDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: [],
      form: {
        commentContent: ''
      }
    };

    return Model;
  }
})();
