(function() {
  'use strict';

  angular.module('app')
    .factory('TalkListModel', TalkListModel);

  TalkListModel.$inject = [];

  function TalkListModel() {

    var Model = {
      loading: false,
      categoryToggle: false,
      selectedCategory: '전체',
      notices: [],
      posts: []
    };

    return Model;
  }
})();
