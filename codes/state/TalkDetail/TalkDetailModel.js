(function() {
  'use strict';

  angular.module('app')
    .factory('TalkDetailModel', TalkDetailModel)


  TalkDetailModel.$inject = [];

  function TalkDetailModel() {

    var Model = {
      loading: false,
      isAnnonymous: false,
      toggleMore: false,
      post: {},
      comment: {
        content: ''
      },
    };

    return Model;
  }
})();
