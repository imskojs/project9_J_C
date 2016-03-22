(function() {
  'use strict';

  angular.module('app')
    .factory('TalkDetailModel', TalkDetailModel)


  TalkDetailModel.$inject = [];

  function TalkDetailModel() {

    var Model = {
      handle: 'talk-detail',
      loading: false,
      toggleMore: false,
      post: {},
      comments: [],
      comment: {
        isAnnonymous: false,
        content: ''
      }
    };

    return Model;
  }
})();
