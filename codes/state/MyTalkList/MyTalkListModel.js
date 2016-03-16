(function() {
  'use strict';

  angular.module('app')
    .factory('MyTalkListModel', MyTalkListModel);

  MyTalkListModel.$inject = [];

  function MyTalkListModel() {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
