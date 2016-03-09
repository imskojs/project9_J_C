(function() {
  'use strict';

  angular.module('app')
    .factory('NoticeListModel', NoticeListModel);

  NoticeListModel.$inject = [];

  function NoticeListModel() {

    var Model = {
      loading: false,
      notices: [
        {
          title: '긴급 서비스 점검 안내',
          date: '2016.03.04',
          content: '긴급 서비스 점검입니다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati, totam minima porro assumenda sunt quam perspiciatis earum deserunt dolores explicabo aperiam quod eius praesentium cupiditate culpa officia amet accusantium?'
        },
        {
          title: '주당 약관 변경 안내',
          date: '2016.03.04',
          content: '주당 약관 변경 안내입니다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis amet beatae iure blanditiis maiores, eos, doloribus magni officia sunt numquam qui cupiditate minus consectetur, eius tempore, nulla? Autem commodi, asperiores.'
        },
        {
          title: '이벤트 당첨자 발표',
          date: '2016.03.04',
          content: '이벤트 당첨자 발표입니다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia deserunt aliquam sapiente maxime minus reprehenderit aspernatur consequuntur modi eum eos sed itaque ratione tenetur temporibus quidem numquam, atque nostrum sunt.'
        },
      ]

    };

    return Model;
  }
})();
