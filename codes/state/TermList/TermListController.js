(function() {
  'use strict';
  angular.module('app')
    .controller('TermListController', TermListController);

  TermListController.$inject = [
    '_MockData',
    'TermListModel'
  ];

  function TermListController(
    _MockData,
    TermListModel
  ) {
    var TermList = this;
    TermList.Model = TermListModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
