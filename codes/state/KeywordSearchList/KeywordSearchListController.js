(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordSearchListController', KeywordSearchListController);

  KeywordSearchListController.$inject = [
    'KeywordSearchListModel'
  ];

  function KeywordSearchListController(
    KeywordSearchListModel
  ) {
    var KeywordSearchList = this;
    KeywordSearchList.Model = KeywordSearchListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
