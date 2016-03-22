(function() {
  'use strict';

  angular.module('app')
    .factory('NoticeDetailModel', NoticeDetailModel);

  NoticeDetailModel.$inject = [];

  function NoticeDetailModel() {

    var Model = {
      handle: 'notice-detail',
      loading: false,
      post: {}
    };

    return Model;
  }
})();
