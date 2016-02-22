(function() {
  'use strict';
  angular.module('app')
    .controller('MyMessageListController', MyMessageListController);

  MyMessageListController.$inject = [
    'MyMessageListModel'
  ];

  function MyMessageListController(
    MyMessageListModel
  ) {
    var MyMessageList = this;
    MyMessageList.Model = MyMessageListModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
