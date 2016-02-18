(function() {
  'use strict';
  angular.module('app')
    .controller('MyTalkListController', MyTalkListController);

  MyTalkListController.$inject = [
    'MyTalkListModel'
  ];

  function MyTalkListController(
    MyTalkListModel
  ) {
    var MyTalkList = this;
    MyTalkList.Model = MyTalkListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
