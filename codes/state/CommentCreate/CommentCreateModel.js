(function() {
  'use strict';

  angular.module('app')
    .factory('CommentCreateModel', CommentCreateModel);

  CommentCreateModel.$inject = [];

  function CommentCreateModel() {

    var Model = {
      loading: false,
      user: {},  //로그인한 유저 본인, 세션
      review: {},
      comment: {
        content: ''
      }
    };

    return Model;
  }
})();
