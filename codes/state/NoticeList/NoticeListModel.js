(function() {
  'use strict';

  angular.module('app')
    .factory('NoticeListModel', NoticeListModel);

  NoticeListModel.$inject = [];

  function NoticeListModel() {

    var Model = {
      handle: 'notice-list',
      loading: false,
      posts: []
    };

    return Model;
  }
})();
