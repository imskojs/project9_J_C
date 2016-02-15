(function() {
  'use strict';

  angular.module('app')
    .factory('zPostListModel', zPostListModel);

  zPostListModel.$inject = [];

  function zPostListModel() {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
