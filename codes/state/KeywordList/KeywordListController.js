(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordListController', KeywordListController);

  KeywordListController.$inject = [
    'KeywordListModel'
  ];

  function KeywordListController(KeywordListModel) {
    var KeywordList = this;
    KeywordList.Model = KeywordListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
