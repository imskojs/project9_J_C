(function() {
  'use strict';
  angular.module('app')
    .controller('NoticeDetailController', NoticeDetailController);

  NoticeDetailController.$inject = [
    'NoticeDetailModel'
  ];

  function NoticeDetailController(
    NoticeDetailModel
  ) {
    var NoticeDetail = this;
    NoticeDetail.Model = NoticeDetailModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
