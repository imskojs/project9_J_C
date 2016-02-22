(function() {
  'use strict';
  angular.module('app')
    .controller('NoticeListController', NoticeListController);

  NoticeListController.$inject = [
    'NoticeListModel'
  ];

  function NoticeListController(
    NoticeListModel
  ) {
    var NoticeList = this;
    NoticeList.Model = NoticeListModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
