(function() {
  'use strict';
  angular.module('app')
    .controller('TermListController', TermListController);

  TermListController.$inject = [
    'TermListModel'
  ];

  function TermListController(
    TermListModel
  ) {
    var TermList = this;
    TermList.Model = TermListModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
