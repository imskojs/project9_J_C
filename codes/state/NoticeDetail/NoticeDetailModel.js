(function() {
  'use strict';

  angular.module('app')
    .factory('NoticeDetailModel', NoticeDetailModel);

  NoticeDetailModel.$inject = [];

  function NoticeDetailModel() {

    var Model = {
      loading: false,
      notice: {
        title: '긴급 서비스 점검 안내',
        date: '2016.03.04',
        content: '긴급 서비스 점검입니다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati, totam minima porro assumenda sunt quam perspiciatis earum deserunt dolores explicabo aperiam quod eius praesentium cupiditate culpa officia amet accusantium?'
      }

    };

    return Model;
  }
})();
