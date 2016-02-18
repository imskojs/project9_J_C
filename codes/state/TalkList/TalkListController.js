(function() {
  'use strict';
  angular.module('app')
    .controller('TalkListController', TalkListController);

  TalkListController.$inject = [
    'TalkListModel'
  ];

  function TalkListController(
    TalkListModel
  ) {
    var TalkList = this;
    TalkList.Model = TalkListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
