(function() {
  'use strict';

  angular.module('app')
    .factory('zPostListModel', zPostListModel);

  zPostListModel.$inject = [];

  function zPostListModel() {

    var Model = {
      handle: 'post-list',
      loading: false,
      posts: []
    };

    return Model;
  }
})();
