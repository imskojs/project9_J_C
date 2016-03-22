(function() {
  'use strict';

  angular.module('app')
    .factory('MyTalkListModel', MyTalkListModel);

  MyTalkListModel.$inject = [];

  function MyTalkListModel() {

    var Model = {
      handle: 'my-talk-list',
      loading: false,
      // categoryToggle: false,
      // selectedCategory: '전체',
      // notices: [],
      posts: []
    };

    return Model;
  }
})();
