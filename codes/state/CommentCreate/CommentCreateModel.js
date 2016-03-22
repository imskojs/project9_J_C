(function() {
  'use strict';

  angular.module('app')
    .factory('CommentCreateModel', CommentCreateModel);

  CommentCreateModel.$inject = [];

  function CommentCreateModel() {

    var Model = {
      handle: 'comment-create',
      loading: false,
      user: {}, //로그인한 유저 본인, 세션
      review: {},
      reviewOwner: {},
      comment: {
        content: ''
      }
    };

    return Model;
  }
})();
